import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { fetchNotes, addNote } from '../../store/actions/noteActions';

const AddNoteForm = ({ fetchNotes, addNote, id, plant, notes }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [values, setValues] = useState({
    body: '',
    date: '',
  });

  const [errors, setErrors] = useState({
    body: '',
    date: '',
  });

  const formSchema = yup.object().shape({
    body: yup.string().required(2, 'Plant name is a required field'),
    date: yup.string(),
  });

  useEffect(() => {
    formSchema.isValid(values).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [values, formSchema]);

  useEffect(() => {
    fetchNotes(plant[0].id);
  }, [notes, fetchNotes, plant]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(values, plant[0].id);

    setValues({
      body: '',
      date: '',
    });
  };

  const inputChange = (e) => {
    e.persist();

    setValues({
      ...values,
      [e.target.name]:
        e.target.type === 'number' ? parseInt(e.target.value) : e.target.value,
    });

    validateChange(e);
  };

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(() => {
        setErrors({
          ...errors,
          [e.target.name]: '',
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });
  };

  return (
    <section>
      <h2>{plant[0].nickname}</h2>
      <h3>Add Notes</h3>
      <section>
        <input
          type='text'
          name='body'
          placeholder='Enter Note'
          values={values.body}
          onChange={inputChange}
        />

        <input
          type='date'
          name='date'
          values={values.date}
          onChange={inputChange}
        />
      </section>
      {notes.map((note) => {
        return <div key={note.id}>{note.body}</div>;
      })}

      <button disabled={buttonDisabled} onClick={handleSubmit}>
        Save Note
      </button>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    plant: state.plantR.plants,
    id: state.userR.id,
    notes: state.noteR.notes,
  };
};

export default connect(mapStateToProps, { fetchNotes, addNote })(AddNoteForm);
