import React from 'react';
import { v1 as uuid } from 'uuid';

const CreateRoom = props => {
  const create = () => {
    props.history.push(`/room/${uuid()}`);
  };
  return (
    <button type="button" onClick={create}>Create Room </button>
  );
};

export default CreateRoom;
