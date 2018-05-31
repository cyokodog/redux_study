import React, { useState } from 'react';
import { todoSlice } from '../slice';
import { useDispatch, connect } from 'react-redux';

export const TaskInput: React.FC = () => {
  const dispatch = useDispatch();

  const [inputTitle, setInputTitle] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputTitle) {
      return;
    }
    dispatch(todoSlice.actions.addTask(inputTitle));
    // dispatch(todoSlice.actions.addFoo(inputTitle));
    setInputTitle('');
  };

  return (
    <div className="input-form">
      <form className="inner" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          value={inputTitle}
          onChange={handleInputChange}
        ></input>
        <button className="btn is-primary">追加</button>
      </form>
    </div>
  );
};

// export const TaskInput_ = (actions: any) => {
//   const dispatch = useDispatch();

//   const [inputTitle, setInputTitle] = useState('');

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInputTitle(event.target.value);
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (!inputTitle) {
//       return;
//     }
//     // dispatch(todoSlice.actions.addTask(inputTitle));
//     // dispatch(todoSlice.actions.addFoo(inputTitle));
//     actions.addTask(inputTitle);
//     actions.addFoo(inputTitle);
//     setInputTitle('');
//   };

//   return (
//     <div className="input-form">
//       <form className="inner" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           className="input"
//           value={inputTitle}
//           onChange={handleInputChange}
//         ></input>
//         <button className="btn is-primary">追加</button>
//       </form>
//     </div>
//   );
// };

// export const TaskInput = connect(null, todoSlice.actions)(TaskInput_);

//export default TaskInput;
