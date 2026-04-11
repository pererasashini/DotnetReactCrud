import { useEffect, useState } from "react"
import PersonForm from "./PersonForm"
import PersonList from "./PersonList"
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast';
import axios from "axios";

function Person() {
    const BASE_URL = import.meta.env.VITE_BASE_API_URL + '/people';

    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        const loadPeople = async () => {
            try {
                var peopleData = (await axios.get(BASE_URL)).data;
                setPeople(peopleData);
            } catch (error) {
                console.log(error);
                toast.error("Error has occured!");
            } finally {
                setLoading(false);
            }
        }
        loadPeople();
    }, []);

    useEffect(() => {
        if (editData) {
            methods.reset(editData);
        }
    }, [editData])

    const defaultFormValues = {
        id: 0,
        firstName: '',
        lastName: '',
        emailAddress: '',
        dateOfBirth: '',
        salary: '',
        department: ''
    }

    const methods = useForm({
        defaultValues: defaultFormValues
    });

    // Watch dateOfBirth to auto-calculate age
    const dateOfBirth = methods.watch('dateOfBirth');

    // Calculate age based on date of birth
    const calculateAge = (dob) => {
        if (!dob) return '';
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleFormReset = () => {
        methods.reset(defaultFormValues);
        setEditData(null);
    }

    const handleFormSubmit = async (person) => {
        setLoading(true);
        try {
            const personData = {
                firstName: person.firstName,
                lastName: person.lastName,
                emailAddress: person.emailAddress,
                dateOfBirth: person.dateOfBirth ? new Date(person.dateOfBirth).toISOString() : null,
                salary: parseFloat(person.salary) || 0,
                department: person.department
            };

            if (person.id <= 0) {
                // Create new person
                const response = await axios.post(BASE_URL, personData);
                // Fetch complete person data including age
                const completePerson = (await axios.get(`${BASE_URL}/${response.data.id}`)).data;
                setPeople((previousPerson) => [...previousPerson, completePerson]);
                toast.success("Person added successfully!");
            } else {
                // Update existing person
                personData.id = person.id;
                const response = await axios.put(`${BASE_URL}/${person.id}`, personData);

                // Use the response data if available, otherwise create updated object
                const updatedPerson = response.data || {
                    ...personData,
                    id: person.id,
                    // Recalculate age on frontend as fallback
                    age: calculateAge(person.dateOfBirth)
                };

                setPeople((previousPeople) =>
                    previousPeople.map(p => p.id === person.id ? updatedPerson : p)
                );
                toast.success("Person updated successfully!");
            }
            methods.reset(defaultFormValues);
            setEditData(null);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Error has occured!");
        } finally {
            setLoading(false);
        }
    }

    const handlePersonEdit = (person) => {
        // Format date for input field (YYYY-MM-DD)
        const formattedPerson = {
            ...person,
            dateOfBirth: person.dateOfBirth ? person.dateOfBirth.split('T')[0] : '',
            salary: person.salary || ''
        };
        setEditData(formattedPerson);
    }

    const handlePersonDelete = async (person) => {
        if (!confirm(`Are you sure to delete a person : ${person.firstName} ${person.lastName}`)) return;
        setLoading(true);
        try {
            await axios.delete(`${BASE_URL}/${person.id}`);
            setPeople((previousPerson) => previousPerson.filter(p => p.id !== person.id));
            toast.success("Deleted successfully!");
        } catch (error) {
            toast.error("Error on deleting!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Person Management
                    </h1>
                    {loading && <p>Loading...</p>}
                </div>

                <PersonForm
                    methods={methods}
                    onFormSubmit={handleFormSubmit}
                    onFormReset={handleFormReset}
                    calculateAge={calculateAge}
                    dateOfBirth={dateOfBirth}
                />
                <PersonList
                    peopleList={people}
                    onPersonEdit={handlePersonEdit}
                    onPersonDelete={handlePersonDelete}
                />
            </div>
        </div>
    )
}

export default Person