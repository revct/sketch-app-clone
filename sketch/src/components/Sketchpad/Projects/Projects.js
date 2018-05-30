import React, { Component} from 'react';
import rename from './projects-assets/rename.png';
import trashCan from './projects-assets/trash-can.png';
import { connect } from 'react-redux';
import './projects.css';

class Projects extends Component{
    constructor(){
      super();
      this.state = {
        projectsDisplay: true,
        projects: ["sketch", "old app", "new app"],
        selectedProject: null,
        editProject: null,
        addProject: false
      }
      this.handleDisplay = this.handleDisplay.bind(this);
      this.addProjectToggle = this.addProjectToggle.bind(this);
      this.addToProjects = this.addToProjects.bind(this);
      this.selectProject = this.selectProject.bind(this);
      this.editProject = this.editProject.bind(this);
      this.renameProject = this.renameProject.bind(this);
    }


    handleDisplay(){
      if(this.state.projectsDisplay){
      this.setState({
        projectsDisplay: false
      })}else{
      this.setState({
        projectsDisplay: true,
      })}
    }
    addProjectToggle(){
      if(this.state.addProject == false){
        this.setState({
          addProject: true
        })
      }else{
        this.setState({
          addProject: false
        })
      }
    }

    addToProjects(e, val){
      if(e.key === 'Enter'){
      this.state.projects.push(val);
      this.setState({
        addProject: false
      })
      }
    }

    selectProject(val){
      this.setState({
        selectedProject: val
      })
    }
    
    editProject(val){
      
        this.setState({
          editProject: val
        })
    
    }
    renameProject(e, val){
      if(e.key === 'Enter'){
        let projects = this.state.projects;
        let editProject = this.state.editProject;
        console.log(editProject)
        
        projects.splice(editProject, 1);
        projects.unshift(val);
        this.setState({
          editProject: null
        })
      
      }
      
    }

    
    
    


  render(){
    let { projects, editProject } = this.state;
   console.log(projects)
   
    return (
      <div id="ske-projects">
        <div id="ske-all-projects-header">
          { this.state.projectsDisplay === false ? 
            <div id="ske-projects-triangle" 
              onClick={()=> this.handleDisplay()}></div> 
              : 
            <div id="ske-projects-triangle2" 
              onClick={()=> this.handleDisplay()}></div>}

            Projects 
            <span id="ske-projects-plus" onClick={() => this.addProjectToggle()}>+</span>
        </div>

        { this.state.projectsDisplay ? this.state.projects.map((e,i)=> {
          return(
            <div id="ske-projects-display" key={i} onClick={() => this.selectProject( e )}>
                { e === projects[editProject] 
                  ? 
                  <input className="ske-projects-rename-input" placeholder={projects[editProject]} onKeyPress={ (e) => this.renameProject(e, e.target.value)}/> 
                  : 
                  <div>{e}</div> 
                }
              <div>
                <img id="ske-projects-rename" src={rename} alt="" onClick={() => this.editProject(i)}/>
                <img id="ske-projects-rename" src={trashCan} alt=""/>
              </div>
            </div>  
            )
            })
            : 
            <div></div>  
        }

        {this.state.editProject !== null ? 
        
      <div>
        
        
      </div>
      
    
    
    : 
    <div></div>}


        { !this.state.addProject ? <div></div> : <input type='' className='ske-add-project-input' placeholder="Add Project" onKeyPress={ (e) => this.addToProjects(e, e.target.value)}/> }

        <div>{this.state.selectedProject == null ? <div></div> : <div id="ske-selected-project-display">{this.state.selectedProject}</div>  }</div> 

      </div>
    )
  }
}

export default Projects;
