import { useState, useEffect } from "react";
import { getUserTodos } from "./utils";


function TodosComp({todos}) {

  


  return (
   <>
   {todos}
   </>
  );
};

export default TodosComp;