import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { routerTransition } from '../router.animations';
import {DialogModule,SharedModule,DataTableModule} from 'primeng/primeng';
import {FormServiceApi,QuestionTypeApi} from '../shared/shared';
import {GlobalApi} from '../shared/global-functions';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    animations: [routerTransition()]
  })

export class FormComponent implements OnInit {

    displayQuestion: boolean = false;
    displaySelectionList: boolean = false;

    questionTypes : any[] = [];
  
    FormModel: any = {};
    QuestionModel: any = {};

    FormQuestions : any[] = [];
    questions : any[] = [];

    FieldAnswers : any[] = [];
    selectionAnswers : any[] = [];

    AnswerModel : any = {};
    //used for data manipulation 
    TempAnswerModel : any = {};

    //used for data manipulation 
    TempQuestionModel : any = {};

    FormId : any = 0;

    constructor(
               private router: Router,
               private route:ActivatedRoute,
               private formServiceApi:FormServiceApi,
               private questionTypeApi:QuestionTypeApi,
               private globalApi : GlobalApi) {

          this.FormId = this.route.snapshot.params['formid'];
          this.FormModel.Title = "";
          this.FormModel.Description = "";
          this.AnswerModel.Answer = "";
          if(this.FormId !== '0'){
            this.getFormApi();
          }
          this.refreshQuestionVariables();
    }

    showQuestionDialog() {
      this.FieldAnswers = [];
      this.selectionAnswers = [];
      this.refreshQuestionVariables();
      this.displayQuestion = true;
    }

    hideQuestionDialog() {
      this.refreshQuestionVariables();
      this.displayQuestion = false;
    }

    showSelectionListDialog() {
      this.refreshAnswerVariables();
      this.displaySelectionList = true;
    }

    hideSelectionListDialog() {
      this.refreshAnswerVariables();
      this.displaySelectionList = false;
    }

    ngOnInit(){
       this.loadQuestionTypesApi();
    }

    //enable Save Question button after all conditions are satisfied
    disableSaveQuestionButton(selectionType) : boolean {
       //if question type selected is selection list, check if at least one valid answer has been added
       if(selectionType==='5') {
         if(this.FieldAnswers.length > 0) {
             return false;
         }
       }else{
         if(this.QuestionModel.question !==''){
           return false;
         }
       }
       return true;
    }
    

    //Load Question Types From Remote Database
    loadQuestionTypesApi() {
       this.questionTypes = [];
       this.questionTypeApi.getQuestionTypes()
       .subscribe(
            res => {
              this.questionTypes = res;
            },err => {
              console.log(err);
              return;
          });
    }

    //Save Question Data
    saveQuestionData() {
        console.clear();
        if(this.QuestionModel.id=== ""
          || this.QuestionModel.id=== undefined
          || this.QuestionModel.id=== "undefined"
          || this.QuestionModel.id=== null) {
            this.addNewQuestionData();
          }else{
            this.updateQuestionData();
          }
    }

    //Add new question data
    addNewQuestionData() {
        this.FormQuestions.push({
            id: this.globalApi.newGuid(),
            questionTypeId: this.QuestionModel.SelectedQuestionTypeModel,
            questionTypeName : this.parseQuestionType(this.QuestionModel.SelectedQuestionTypeModel),
            question : this.QuestionModel.question,
            answers : this.FieldAnswers,
            mandatory : this.QuestionModel.Mandatory
        });
       this.questions = this.FormQuestions;
       console.log(JSON.stringify(this.FormQuestions));
       this.refreshQuestionVariables();
    }

    //Update question data
    updateQuestionData(){
       this.deleteQuestion(this.TempQuestionModel);
       this.addNewQuestionData();
       this.TempQuestionModel = {};
       this.QuestionModel.id = null;
       this.hideQuestionDialog();
    }
    
    //Save Answer Data
    saveAnswerData() {
        console.clear();
        //check if add or update
        if(this.AnswerModel.id=== ""
          || this.AnswerModel.id=== undefined
          || this.AnswerModel.id=== "undefined"
          || this.AnswerModel.id=== null) {
            this.addNewAnswerData();
         }else{
            this.updateAnswerData();
         }
    }

    // Add new Answer data
    addNewAnswerData() {
        this.selectionAnswers = [];
        //Save Answer
        this.FieldAnswers.push({
            id: this.globalApi.newGuid(),
            answer: this.AnswerModel.Answer
        });
        
        this.selectionAnswers = this.FieldAnswers;
        console.log(JSON.stringify(this.selectionAnswers));
        this.refreshAnswerVariables();
    }

    //Update existing answer data
    updateAnswerData() {
       this.deleteAnswer(this.TempAnswerModel);
       this.addNewAnswerData();
       this.TempAnswerModel = {};
       this.AnswerModel.id = null;
       this.hideSelectionListDialog();
    }
    
    refreshQuestionVariables() {
       this.QuestionModel.SelectedQuestionTypeModel = -1;
       this.QuestionModel.question = "";
       this.FieldAnswers = [];
       this.QuestionModel.Mandatory = false;
       this.QuestionModel.SelectionList = [];
    }

    refreshAnswerVariables() {
       this.AnswerModel.Answer = "";
    }

    //delete selection answer from array
    deleteAnswer(selectionAnswer) {
        let index: number = this.FieldAnswers.indexOf(selectionAnswer);
        if (index !== -1) {
            this.FieldAnswers.splice(index, 1);
        }
        this.selectionAnswers = this.FieldAnswers;
        console.log(JSON.stringify(this.selectionAnswers));
    }

    //select answer from aray to edit
    editAnswer(selectionAnswer) {     
         this.showSelectionListDialog();   
         this.TempAnswerModel =  this.FieldAnswers.find(answer => answer.id === selectionAnswer.id);
         this.AnswerModel.id =  selectionAnswer.id;
         this.AnswerModel.Answer =  this.TempAnswerModel.answer;
    }

    //select question from aray to edit
    editQuestion(questionvar) {
        this.showQuestionDialog();
        this.FieldAnswers = [];
        this.TempQuestionModel=  this.FormQuestions.find(question => question.id === questionvar.id);
        this.QuestionModel.id = questionvar.id;
        this.QuestionModel.SelectedQuestionTypeModel =  this.TempQuestionModel.questionTypeId;
        this.QuestionModel.question =  this.TempQuestionModel.question;
        this.FieldAnswers = this.TempQuestionModel.answers;
        this.QuestionModel.Mandatory = this.TempQuestionModel.mandatory;
        this.selectionAnswers =  this.FieldAnswers;
    }

    //delete  question from array
    deleteQuestion(question) {
      let index: number = this.FormQuestions.indexOf(question);
      if (index !== -1) {
          this.FormQuestions.splice(index, 1);
      }
      this.questions = this.FormQuestions;
      console.log(JSON.stringify(this.questions));
    }

    //Save Form data to web service
    saveFormApi() {
       if(this.FormId==="0"){
         this.addNewFormApi();
       }else{
        this.updateFormApi();
       }
    }

    //Get Form data from web service
    getFormApi() {
      this.questions = []
      this.formServiceApi.getForm(this.FormId)
      .subscribe(
          res => {
              //console.log(JSON.stringify(res));
              this.FormModel.Title = res.title;
              this.FormModel.Description = res.description;
              this.FormQuestions = JSON.parse(res.fields);
              this.questions = this.FormQuestions;
              for(var i=0; i<this.questions.length; i++) {
                if(this.questions[i].answers.length > 0) {
                  this.FieldAnswers = this.questions[i].answers;
                }
              }
              this.selectionAnswers = this.FieldAnswers;
              console.log(JSON.stringify(this.selectionAnswers));
          },err => {
             console.log(err.message);
             return;
        });
    }

    //Add New Form data to web service
    addNewFormApi() {
        let FormDtoIn = {
            id: 1,
            title: this.FormModel.Title,
            description: this.FormModel.Description,
            fields: JSON.stringify(this.FormQuestions)
        };
        this.formServiceApi.addForm(FormDtoIn)
        .subscribe(
            res => {
                this.router.navigate(['/viewforms']);
                console.log(JSON.stringify(res));
            },err => {
              console.log(err);
              return;
          });
    }

    //Update Form data to web service
    updateFormApi() {
          let FormDtoIn = {
             id: this.FormId,
             title: this.FormModel.Title,
             description: this.FormModel.Description,
             fields: JSON.stringify(this.FormQuestions)
        };
        console.log(FormDtoIn.fields);
        this.formServiceApi.updateForm(FormDtoIn)
        .subscribe(
            res => {
                this.router.navigate(['/viewforms']);
                console.log(JSON.stringify(res));
            },err => {
                console.log(err);
                return;
            });
    }

    parseQuestionType(qtype):string{
      if(qtype==='1'){
        return "Short Text";
      }else if(qtype==='2'){
        return "Long Text";
      }else if(qtype==='3'){
        return "Numeric";
      }else if(qtype==='4'){
        return "Yes/No";
      }else if(qtype==='5'){
        return "Selection";
      }else if(qtype==='6'){
        return "Photo";
      }else if(qtype==='7'){
        return "Date";
      }else if(qtype==='8'){
        return "Section Header";
      }else if(qtype==='9'){
        return "Bar Code";
      }else if(qtype==='10'){
        return "Product";
      }
  }
    

}
