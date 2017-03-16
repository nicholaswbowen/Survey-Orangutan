function randomAge(max, amount){
  return new Promise((resolve,reject) => {
  let values = [];
  for (let i = 0; i < amount; i++){
    values.push({age: Math.floor(Math.random() * (max - 18) + 18)});
  }
    resolve(values);
  });
}
function randomInfo(amount, option){
  return new Promise((resolve,reject) => {
    let random = 0;
    let result = [];
    let races =
    ['African American','White','Hispanic or Latino',
    'Native American or American Indian.', 'Asian / Pacific Islander.', 'Other' ];
    let sexes = [
      'Male',
      'Female',
      'Other',
      'Prefer not to answer'
    ]
    if (option == "race"){
      for (let i = 0; i < amount; i++){
        random = Math.floor(Math.random() * 5);
        result.push({race: races[random]});
      }
      resolve(result);
    }else if (option == 'sex') {
      for (let i = 0; i < amount; i++){
        random = Math.floor(Math.random() * 3);
        result.push({sex: sexes[random]});
      }
      resolve(result);
    }else{
      reject("Not a valid option");
    }
  })
}
function randomAnswers(amount,lengthOfSurvey,options){
  return new Promise((resolve,reject) => {
    let random = 0;
    let result = [];
    for (let i = 0; i < amount; i++){
      let innerArray = [];
      for (let i = 0; i < lengthOfSurvey; i++){
        random = Math.floor(Math.random() * options);
        innerArray.push(random);
      }
      result.push(innerArray);
    }
    resolve(result);
  })
}
export const generateParticipants = (amount) => {
  return new Promise((resolve,reject) => {
      Promise.all([
        randomAge(50,amount),
        randomInfo(amount,'race'),
        randomInfo(amount,'sex'),
        randomAnswers(amount,5,4)
      ])
      .then((info) => {
        let result = {
          title: 'sampleData',
          owner: 'admin',
          participants: [],
          questions: ['Lorem ipsum dolor sit amet', 'ei sed neglegentur ullamcorper, brute fastidii',
          'iracundia nec ei, vis eu epicurei atomorum.', 'Ridens semper volutpat sit et, ad dicat commodo ius. Mea tota corpora eu',
          'laudem denique omittantur an duo, facilis adolescens mea ne.'],
          responses: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree']
        };
        for (let i = 0; i < amount; i++){
          let participant = {info: Object.assign(info[0][i],info[1][i],info[2][i]), answers: info[3][i] }
          result.participants.push(participant);
        }
        resolve(result);
      })
  })
}
