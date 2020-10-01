console.log("Muhamamd Taimoor");
var MyTask = [];
var FetchTaskAdderForm = document.querySelector(".taskAdder");
var DisplayMyTask = document.querySelector(".RenderTask")
var DeletedTask = [];
var FetchDeleteButton = document.getElementsByClassName("DeleteButton");
var SearchFetch = document.querySelector("#SearchInput");
var AllButtonFetch = document.querySelector(".All")
var deletedTask= [];
var deleteFetch = document.querySelector(".Deleted");
var doneFetch = document.querySelector(".Done");
var DoneTask= [];
var AllTask
var TaskObject = {
    title : "",
    isCompleted : false,
    taskNumber : 0
};
var UndoTasks= [];
        
var AllDoneTaskForBelowButton=[];
var filteredTask= [];
var counter = 0;
//  var filteredTask = [];
var NoUseArray = [];
var NoUseArrayforUndoTask = [];

var  i=0;
//simple Print 
function PrintMyTask(MyTasks){
    DisplayMyTask.innerHTML="";
    var position = "beforeend";
    for (var index = 0; index < MyTasks.length; index++) {
        // const element = array[index];
        DisplayMyTask.insertAdjacentHTML("beforeend", `<li class="item flex" >
        <i class="far fa-circle"></i>
        <h1>${MyTasks[index].title}</h1>
        <div id=${MyTasks[index].title} class="DeleteButton flex">Delete </div>
        <div id=${MyTasks[index].title} class="DoneButton flex">Done </div>
    
    </li>`)
    }
}

//TaskAdder
FetchTaskAdderForm.addEventListener("submit", function(extraInfo)
{
    extraInfo.preventDefault();
    var taskInput = document.querySelector(".Task").value;
    counter++; 
    TaskObject = {
        title : taskInput,
        isCompleted : false,
        taskNumber : counter
    };
    MyTask.push(TaskObject);
    PrintMyTask(MyTask);


});

//delete and done
DisplayMyTask.addEventListener("click", function(extraInfo)
{
var MyClasses = extraInfo.target.classList;
var SimplifyClasses = Array.from(MyClasses);
// console.log(SimplifyClasses);
if (SimplifyClasses.includes("DeleteButton"))
{
    var taskId = extraInfo.target.id;
    
         filteredTask= [];
    //  filteredTask = MyTask;
    for (var index = 0; index < MyTask.length; index++) {
        // const element = array[index];
        if (MyTask[index].title!==taskId)
        {
            filteredTask.push(MyTask[index]);
            // console.log(filteredTask);
        }
        else if(MyTask[index].title==taskId)
        {
            deletedTask.push(MyTask[index]);
        }
        
        
    }
   MyTask = filteredTask;
   PrintMyTask(MyTask);

}
 if (SimplifyClasses.includes("DoneButton"))
 {
    NoUseArray=[];
    var taskId = extraInfo.target.id;
        for (var index = 0; index < MyTask.length; index++) {
           if(MyTask[index].title==taskId)
      { 
 
        MyTask[index].isCompleted=true
        DoneTask.push(MyTask[index]);
        AllDoneTaskForBelowButton=DoneTask;
        
    
    }
    else if(MyTask[index].title!==taskId)
    {
        if(MyTask[index].isCompleted==true)
        {
            
            MyTask[index].isCompleted=true;
            if(DoneTask.includes(MyTask[index].title))
            {
                // DoneTask.push(MyTask[index]);
                
            }
           
        }
        else
        {

            MyTask[index].isCompleted=false;
            NoUseArray.push(MyTask[index]);
            
        }
        
    }
    
}
     DoneTask.push(NoUseArray);
     console.log("DoneArray",MyTask); //all done and undone task

    //  console.log("NotDoneArray",NoUseArray); //all undone task
    //  console.log("AllDoneTaskForBelowButton",AllDoneTaskForBelowButton);  //all done task only

    PrintForDoneButton(MyTask);
}
});



//undo button

DisplayMyTask.addEventListener('click', function(extraInfo)
{
    var MyClasses = extraInfo.target.classList;
    var SimplifyClasses = Array.from(MyClasses);
    if(SimplifyClasses.includes("UndoButton"))
    {
        var taskId = extraInfo.target.id;
        console.log(taskId);
        
        for (var index = 0; index < MyTask.length; index++) {
            // const element = array[index];
            if(MyTask[index].title==taskId)
        {
            
            MyTask[index].isCompleted=false;
           
            UndoTasks.push(MyTask[index]);
            
    
        }
        else {
           
            NoUseArrayforUndoTask.push(MyTask[index]);
        //    console.log(NoUseArray);
    
        }
        }
           PrintForDoneButton(MyTask);
    }
    
});


function PrintForDoneButton(CopiedOfTaskArray)
{
    DisplayMyTask.innerHTML="";
    for (var index = 0; index < CopiedOfTaskArray.length; index++) {
        // const element = array[index];
        if(CopiedOfTaskArray[index].isCompleted == false)
        {
            DisplayMyTask.insertAdjacentHTML("beforeend", `<li class="item flex" >
            <i class="far fa-circle"></i>
            <h1>${CopiedOfTaskArray[index].title}</h1>
            <div id=${CopiedOfTaskArray[index].title} class="DeleteButton flex">Delete </div>
            <div id=${CopiedOfTaskArray[index].title} class="DoneButton flex">Done </div>
        
        </li>`)   
        }
        else if(CopiedOfTaskArray[index].isCompleted==true)
      {
        DisplayMyTask.insertAdjacentHTML("beforeend", `<li class="item flex" >
        <i class="far fa-circle"></i>
        <h1>${CopiedOfTaskArray[index].title}</h1>
  
        <div id=${CopiedOfTaskArray[index].title} class="UndoButton flex">Undo </div>
    
    </li>`)
        }
    }
}

//search
SearchFetch.addEventListener("keyup", function(){
    var SearchedValue = document.getElementById("SearchInput").value;
    var MySearchedValues = [];
    for (var index = 0; index < MyTask.length; index++) {
        if(MyTask[index].title.includes(SearchedValue)){
            MySearchedValues.push(MyTask[index]);
        }
        
    }
    PrintForDoneButton(MySearchedValues);
});
//AllButton
AllButtonFetch.addEventListener("click",function(extraInfo){
    extraInfo.preventDefault();
    DisplayMyTask.innerHTML="";
    if(MyTask.length==0)
    {
        alert("No task to display")
    }
    PrintForDoneButton(MyTask);

    // console.log("All task",MyTask);
    // console.log(MyTask.length);

});

//deletedTask 
deleteFetch.addEventListener("click",function(deleteInfo)
{
deleteInfo.preventDefault();
PrintForDoneButton(deletedTask);
});

//done
doneFetch.addEventListener("click", function(doneInfo)
{
doneInfo.preventDefault();
PrintForDoneButton(AllDoneTaskForBelowButton);
});

