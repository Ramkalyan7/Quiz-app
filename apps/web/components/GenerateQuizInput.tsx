import React from "react";

const GenerateQuizInput = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <form>
        <div className=" mx-16 mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
          <div className="px-4 py-2 bg-white rounded-t-lg">
            <textarea
              id="comment"
              rows={4}
              className="w-full px-0 text-sm text-gray-900 bg-white border-0 outline-none resize-none"
              placeholder="e.g., Create a quiz about Programming fundamentals....."
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-center px-3 py-2 border-t  border-gray-200">
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800"
            >
              Generate Quiz
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GenerateQuizInput;
