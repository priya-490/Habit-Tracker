
// function Dashboard()  {
//     return (
//         <>

// </>
//     );
// }

// export default Dashboard;


import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function Dashboard() {
    const { Formik } = formik;

    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        username: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required(),
        zip: yup.string().required(),
        terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
    });

    return (
        <>
            <div className='container' style={{ backgroundColor: '' }}>
                <h2>Add a new Habit</h2>
                <Formik
                    validationSchema={schema}
                    onSubmit={console.log}
                    initialValues={{
                        Title: '',
                        Description: '',

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
                                        isValid={touched.Title && !errors.Title}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="4" >
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
                                        isValid={touched.Description && !errors.Description}
                                    />

                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" >
                                    <FloatingLabel controlId="floatingSelect" label="select frequency of your habit">
                                        <Form.Select aria-label="Floating label select example">
                                            <option>Daily</option>
                                            <option value="1">Weekly</option>
                                            <option value="2">Monthly</option>
                                            <option value="3">Yearly</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Form.Group>

                            </Row>

                            <Button type="submit">Add</Button>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className='container'>
                <h2> Today's habits to follow</h2>
                <Button type="submit" size="sm">Update Habit checks</Button>
                <Form>
                    {['checkbox'].map((type) => (
                        <div key={type} className="mb-3">
                            <Form.Check type={type} id={`check-api-${type}`}>
                                <Form.Check.Input type={type} isValid />
                                <Form.Check.Label>{"Habit name"}</Form.Check.Label>
                                <Form.Control.Feedback type="valid">
                                    "longest streak- 5 days"
                                </Form.Control.Feedback>
                            </Form.Check>
                        </div>
                    ))}
                </Form>

            </div>
        </>
    );
}

export default Dashboard;