import Modal from 'react-bootstrap/Modal';
// A modal is a user interface (UI) element that displays content in a layer above the main application interface. It is often used for specific actions like displaying information, asking for confirmation, or capturing user input without navigating away from the current page.

function Dashboard() {
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentHabit, setCurrentHabit] = useState(null);

    const openEditModal = (habit) => {
        setCurrentHabit(habit);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setCurrentHabit(null);
        setShowEditModal(false);
    };

    const handleSaveChanges = async (updatedFields) => {
        await handleUpdateHabit(currentHabit.id, updatedFields);
        closeEditModal();
    };

    return (
        <>
            <div className="container">
                <h2>Today's habits to follow</h2>
                <Form>
                    {habits.map((habit) => (
                        <div key={habit.id} className="mb-3">
                            <Form.Check type="checkbox" id={`habit-${habit.id}`}>
                                <Form.Check.Input
                                    type="checkbox"
                                    checked={habit.completed}
                                    onChange={(e) => handleUpdateHabit(habit.id, { completed: e.target.checked })}
                                />
                                <Form.Check.Label>{habit.Title}</Form.Check.Label>
                                <Button size="sm" onClick={() => openEditModal(habit)}>Edit</Button>
                            </Form.Check>
                        </div>
                    ))}
                </Form>
            </div>

            {/* Modal for Editing Habit */}
            {currentHabit && (
                <Modal show={showEditModal} onHide={closeEditModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Habit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={{
                                Title: currentHabit.Title,
                                Description: currentHabit.Description,
                                frequency: currentHabit.frequency,
                                completed: currentHabit.completed,
                            }}
                            validationSchema={schema}
                            onSubmit={handleSaveChanges}
                        >
                            {({ handleSubmit, handleChange, values, errors }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Title"
                                            value={values.Title}
                                            onChange={handleChange}
                                            isInvalid={!!errors.Title}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.Title}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Description"
                                            value={values.Description}
                                            onChange={handleChange}
                                            isInvalid={!!errors.Description}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.Description}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Frequency</Form.Label>
                                        <Form.Select
                                            name="frequency"
                                            value={values.frequency}
                                            onChange={handleChange}
                                        >
                                            <option value="Daily">Daily</option>
                                            <option value="Weekly">Weekly</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="Yearly">Yearly</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Button type="submit">Save Changes</Button>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
}

