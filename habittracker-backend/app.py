from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///project.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

#  to avoid some warnings
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# @app.route('/')

# def home():
#     return "Hello, Flask!"

#user model for signup and login data
class User(db.Model):
    id = db.Column(db.Integer, primary_key =True)
    username = db.Column(db.String(80), unique =True, nullable = False)
    password = db.Column(db.String(120), nullable = False)
    habits = db.relationship('Habit', backref = 'user', lazy = True)

# habit model 
class Habit(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title =db.Column(db.String(80), nullable=True)
    description = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    streak = db.Column(db.Integer, default = 0)
    frequency =  db.Column(db.String(50), nullable = True)
    user_id =  db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)

# The to_dict method converts the object into a dictionary, which can then be easily serialized into JSON using Flask's jsonify function.

def to_dict(self):
    return{
        "id": self.id,
        "title": self.title,
        "description": self.description,
        "frequency": self.frequency,
        "completed": self.completed,
        "streak": self.streak,
        "user_id" : self.user_id
    }



# initialize the database
# @app.before_first_request
# def create_tables():
#     db.create_all()

# signup route
@app.route('/signup', methods=['POST'])

def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password :
        return jsonify ({"message" : "name and age are required"}),400
    
    # check if user already exists
    # if User.query.filter_by(username=username).first():
    #     return jsonify({"message": "User already exists"}), 400   
    
    # create a new user
    # new_user = User(username=username, password = password)
    # db.session.add(new_user)
    # db.session.commit()
    
    return jsonify({"message": f"received username: {username}, password: {password}"}),201

# login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")   # this way is preferred as it can handle null values and default values also 
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400
    
    # verify user credentials
    # user = User.query.filter_by(username = username).first()
    # if user and user.password == password :
    return jsonify({"message": f"login successful with username :{username}, password: {password}"}), 200
    # else:
    #     return jsonify({"message": "invalid username or password"}),401
      


## route for getting existing habits of that user       
@app.route('/habits', methods = ['GET'])
def get_habits():
    user_id = request.args.get("user_id")  # assume the frontend sends the user_id as a query parameter
    if not user_id:
        return jsonify({"message": "user ID is required"}), 400
    
    habits = Habit.query.filter_by(user_id = user_id).all() 
    # habits = Habit.query.all()
    if not habits:
        return jsonify({"messgae": "you have not added any habits yet"}),404
    
    return jsonify([habit.to_dict() for habit in habits])



## route for posting/adding a habit
@app.route('/add-habit', methods = ['POST'] )
def add_habit():
    data = request.get_json()
    
    user_id = data.get("user_id")
    title = data.get("Title")
    description = data.get("Description")
    frequency = data.get("frequency")

    if not user_id or not title or not description:
        return jsonify({"message" : "user id, title, and description are required"}), 400

    new_habit = Habit(
        title = title,
        description = description,
        frequency = frequency,
        user_id = user_id
    )

    # new_habit = Habit(
    #     title = data['Title'],
    #     description = data['Description'],
    #     frequency = data['frequency'],
    #     completed = False,
    #     streak = 0 
    # )

    db.session.add(new_habit)
    db.session.commit()

    return jsonify({"message" : f"new habit addes : title is {title}"}),201
    
    # db.session.add(new_habit)
    # db.session.commit()
    # return jsonify(new_habit.to_dict())


## route for updating a habit with given habit id 
@app.route('/update-habit/<int:habit_id>', methods = ['PUT'])

def update_habit(habit_id):
    data = request.get_json()
    habit = Habit.query.get_or_404(habit_id)

    # update habit attributes with the provided data 
    habit.title = data.get('title', habit.title)  # update title if provided, else keep current value
    habit.description = data.get('description', habit.description)
    habit.frequency = data.get('frequency', habit.frequency)
    habit.completed = data.get('completed', habit.completed)

    db.session.commit()

    return jsonify({
        "message": "habit updated successfully",
        "updated_habit":  habit.to_dict()
        }),200

## route for deleting a habit
@app.route('/delete-habit/<int:habit_id>', methods = ['DELETE'])
def delete_habit(habit_id):
    habit = Habit.query.get_or_404(habit_id)

    # delete the habit from the database
    db.session.delete(habit)
    db.session.commit()

    return jsonify({
        "message": f"Habit with ID {habit_id} deleted successfully"
    }),200

# running your server 
if __name__ == '__main__':
    app.run(debug=True)
