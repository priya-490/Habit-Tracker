import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import { useState, useEffect } from 'react';
// import { response } from 'express';


function Dashboard() {

    const { Formik } = formik;

    const [habits, setHabits] = useState([]);  // state to store habits 
    const [loading, setLoading] = useState(false);  // loading state
    const [editHabitId, setEditHabitId] = useState(null);  // state for the habit being edited
    const [editValues, setEditValues] = useState({});  // state for editting values


    // fetch exisiting habits from backend on component mount
    useEffect(() => {

        const fetchHabits = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/habits');
                setHabits(response.data); // assuming backend returns a list of habits
            } catch (error) {
                console.error('error fetching habits: ', error);
            }
        };

        fetchHabits();

    }, []);


    const schema = yup.object().shape({
        Title: yup.string().required('Title is required'),
        Description: yup.string().required('Description is required'),
        frequency: yup.string().required('frequency is required'),
    });


    // function to add a new habit 
    const handleAddHabit = async (values, actions) => {
        //values contain the data that has to be posted 
        // actions : this provides helper methods Formik, such as resetForm to reset the form fields

        setLoading(true);
        // This sets the loading state to true, typically used to show a spinner or disable the submit button while the request is in progress. It ensures the user cannot submit the form multiple times simultaneously.

        try {
            const response = await axios.post('http://127.0.0.1:5000/add-habit', values);
            setHabits([...habits, response.data]); // add a new habit to the state
            // response.data returns the updated habit
            //...habits copies the exisitng habits


            actions.resetForm(); // reset form fields
            alert('habit added successfully');

        } catch (error) {

            console.error('error adding habits: ', error);
            alert('failed to add habit');

        } finally {
            setLoading(false);
        }

    };


    // function to update a habit 
    const handleUpdateHabit = async (habitId) => {
        try {
            await axios.put(`http://127.0.0.1:5000/update-habit/${habitId}`, editValues);

            setHabits((prevHabits) => {
                prevHabits.map((habit) =>
                    habit.id === habitId ? { ...habit, ...editValues } : habit
                    // finds which habit to make changes in and then update accordingly using if else
                )
            });

            setEditHabitId(null); // exit edit mode by clearing the editHabitId
            setEditValues({});  // clears the editting form's field

            alert('Habit updated successfully');

        } catch (error) {
            console.error('error updating habit: ', error);
            alert('failed to update habit');
        }
    }

    // deleting a habit 
    const handleDeleteHabit = async (habitId) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/delete-habit/${habitId}`);
            setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== habitId));
            alert('habit deleted successfully');
        } catch (error) {
            console.error('error deleting habit:', error);
            alert('failed to delete habit');
        }
    };

    return (
        <>
            <div className='container' style={{ backgroundColor: '' }}>
                <h2>Add a new Habit</h2>
                <Formik
                    validationSchema={schema}
                    onSubmit={handleAddHabit}

                    initialValues={{
                        Title: '',
                        Description: '',
                        frequency: 'Daily',
                    }}

                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="4" controlId="validationFormik01">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Title"
                                        placeholder='title of your habit'
                                        value={values.Title}
                                        onChange={handleChange}
                                        isInvalid={touched.Title && !!errors.Title}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.Title}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="4">

                                    {['checkbox'].map((type) => (
                                        <div key={`default-${type}`} className="mb-3">
                                            <Form.Check // prettier-ignore
                                                type={type}
                                                // id={`default-${type}`}
                                                label={'Set email remiders for this habit'}
                                            />

                                        </div>
                                    ))}
                                </Form.Group>

                            </Row>


                            <Row className="mb-3">
                                <Form.Group as={Col} md="4" controlId="validationFormik02">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Description"
                                        placeholder='description of your habit'
                                        value={values.Description}
                                        onChange={handleChange}
                                        isValid={touched.Description && !!errors.Description}
                                    />

                                    <Form.Control.Feedback type='invalid'>{errors.Description}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" >
                                    <FloatingLabel controlId="floatingSelect" label="select frequency of your habit">
                                        <Form.Select
                                            name='frequency'
                                            value={values.frequency}
                                            onChange={handleChange}


                                            aria-label="Floating label select example"
                                        >
                                            <option value="Daily">Daily</option>
                                            <option value="Weekly">Weekly</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="Yearly">Yearly</option>

                                        </Form.Select>
                                    </FloatingLabel>
                                </Form.Group>

                            </Row>

                            <Button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Habit'}</Button>
                        </Form>
                    )}
                </Formik>
            </div>

            <div className='container'>
                <h2> Today's habits to follow</h2>

                {/* <Button type="submit" size="sm">Update Habit checks</Button> */}

                {/* checkbox for habit completion */}
                <Form>
                {habits.map((habit) => (
                        <div key={habit.id} className="mb-3">
                            <Form.Check
                                type="checkbox"
                                id={`habit-${habit.id}`}
                                label={habit.Title}
                                checked={habit.completed}
                                onChange={(e) =>
                                    setHabits((prevHabits) =>
                                        prevHabits.map((h) =>
                                            h.id === habit.id ? { ...h, completed: e.target.checked } : h
                                        )
                                    )
                                }
                            />
                            {editHabitId === habit.id ? (
                                <>
                                    <Form.Control
                                        type="text"
                                        placeholder="Edit Title"
                                        value={editValues.Title || habit.Title}
                                        onChange={(e) => setEditValues({ ...editValues, Title: e.target.value })}
                                    />
                                    <Button size="sm" onClick={() => handleUpdateHabit(habit.id)}>
                                        Save
                                    </Button>
                                    <Button size="sm" onClick={() => setEditHabitId(null)}>
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button size="sm" onClick={() => setEditHabitId(habit.id)}>
                                        Edit
                                    </Button>
                                    <Button size="sm" variant="danger" onClick={() => handleDeleteHabit(habit.id)}>
                                        Delete
                                    </Button>
                                </>
                            )}
                        </div>
                    ))}
                </Form>

            </div>
        </>
    );
}

export default Dashboard;