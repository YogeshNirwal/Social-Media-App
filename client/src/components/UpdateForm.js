import React from "react";

const UpdateForm = ({ handleSubmit, value, setValue, reply = false }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="texto"
            className="form-control"
            placeholder="Enter new comment"
            value={value}
            required
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {reply ? "Reply" : "Update Comment"}
        </button>
      </form>
    </>
  );
};

export default UpdateForm;
