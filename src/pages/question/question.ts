import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from "../../providers/database/database";

/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {
  current: any = {};
  questions: any = {};
  answers: any = [];
  sectionID: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseProvider) {
    this.sectionID = navParams.get('sectionID');
    this.db.executeSQL(`SELECT * FROM questions WHERE section_id = ${this.sectionID}`)
        .then(res => {
          this.questions = {};
          var first = res.rows.item(0).id;
          for (var i = 0; i < res.rows.length; i++){
            this.questions[res.rows.item(i).id] = {
              id:res.rows.item(i).id,
              question_number:res.rows.item(i).question_number,
              question_text:res.rows.item(i).question_text,
              image1:res.rows.item(i).image1,
              image2:res.rows.item(i).image2,
              image3:res.rows.item(i).image3,
              question_sound:res.rows.item(i).question_sound,
              num_of_answer:res.rows.item(i).num_of_answer,
              correct_answer_number:res.rows.item(i).correct_answer_number,
              score:res.rows.item(i).score,
              section_id:res.rows.item(i).section_id,
              correct_answer_sound:res.rows.item(i).correct_answer_sound,
              incorrect_answer_sound:res.rows.item(i).incorrect_answer_sound,
              next_question_id:res.rows.item(i).next_question_id,
              created_date:res.rows.item(i).created_date,
              modified_date:res.rows.item(i).modified_date
            }
            //break;
          }

          console.log(this.questions);

          this.navigate(first);
        }).catch(e => console.log((e)))
  }

  getAnswers(questions_id: number) {
    this.db.executeSQL(`SELECT * FROM answers WHERE question_id = ${questions_id}`)
        .then(res => {
          this.answers = [];
          console.log(res);
          for (var i = 0; i<res.rows.length; i++){
            this.answers.push({
              id:res.rows.item(i).id,
              answer_text:res.rows.item(i).answer_text,
              answer_order:res.rows.item(i).answer_order,
              answer_image:res.rows.item(i).answer_image,
              answer_sound:res.rows.item(i).answer_sound,
              question_id:res.rows.item(i).question_id,
              is_correct_answer:res.rows.item(i).is_correct_answer,
              created_date:res.rows.item(i).created_date,
              modified_date:res.rows.item(i).modified_date
            })
          }
        }).catch(e => console.log((e)))
  }

  navigate(qid) {
    //console.log(qid);
    if (this.questions[qid] == null){
      this.navCtrl.pop();

    } else{
      this.current = this.questions[qid];
      console.log(this.current);
      this.getAnswers(this.current.id);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }

}
