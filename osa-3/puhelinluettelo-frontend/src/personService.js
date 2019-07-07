import axios from 'axios'

const getAllPersons = () => axios.get('http://localhost:3001/api/persons').then(response => response.data)

const addPerson = (data) => axios.post('http://localhost:3001/api/persons', data).then(response => response.data)

const deletePerson = (id) => axios.delete(`http://localhost:3001/api/persons/${id}`).then(response => response.data)

const updatePerson = (data) => axios.put(`http://localhost:3001/api/persons/${data.id}`, data).then(response => response.data)

export { getAllPersons, addPerson, deletePerson, updatePerson }