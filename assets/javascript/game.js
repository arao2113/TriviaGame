$(document).ready(function() {

    // Collect Questions and Answers
  
      // Show only New Game info on page load
    $('.game').hide();
    $('.results').hide();
    // Create HTML for game
  
    // Set Variables
    
    var correct;
    var wrong;
    var answer;
    var counter;
    var count;
    var timeout;
    var i = 0;
  
    var activeQuestion = {
      question: "",
      answer: '',
      choices: [],
    }
  
    // Questions 
      // Possible Answers
      // Correct Answer
  
    // This will be filled in during New Game function and emptied out throughout the game
    var questions = {};
  
    function setQuestions() {
      questions = {
        q1: {
          question: "Who is the L.A Lakers all time scoring leader?",
          answer: 'Kobe Bryant',
          choices: ['Magic Johnson', 'Kobe Bryant', 'Jerry West', 'Kareem Abdul-Jabar','James Worthy'],
        },
        q2: {
          question: "Where is the capital of California?",
          answer: 'Sacramento',
          choices: ['Los Angeles', 'Sacramento','Long Beach','Anaheim','Hollywood'],
        },
        q3: {
          question: "Which is a staple fast food place in California",
          answer: 'In n Out',
          choices: ['In n Out','Five Guys','Pinks','Taco Bell','Starbucks'],
        },
        q4: {
          question: "Where is the Staples Center located",
          answer: 'Downtown L.A',
          choices: ['Santa Monica','Pasadena','Hollywood','Downtown L.A','Inglewood'],
        },
        q5: {
          question: 'The walk of fame is located on which street?',
          answer: 'Hollywood blvd',
          choices: ['Sunset blvd','Hollywood blvd','Santa Monica blvd','Wilshire blvd','Rodeo dr'],
        },
        q6: {
          question: "Who is the latest NBA player to join the Lakers?",
          answer: 'LeBron James',
          choices: ['LeBron James','Kawhi Leonard','Paul George','Bobby Boucher','Anthony Davis'],
        },
        q7: {
          question: "Who sang: To live and die in L.A?",
          answer: '2Pac',
          choices: ['Ice Cube','Dr Dre','Snoop Dogg','2Pac','Eazy E'],
        },
        q8: {
          question: "The Olympics are coming to L.A which year",
          answer: 2028,
          choices: [2020, 2022, 2024, 2026, 2028],
        },
        q9: {
          question: "Which game takes place in Los Angeles",
          answer: 'All the above',
          choices: ['GTA 3','L.A Noire','GTA 5','Midnight Club L.A','All the above'],
        }
      };
    }
  
  
    // Timer Settings
    var questionTimer = {
      //Time Per Question
      time: 15,
      reset: function(t) {
        questionTimer.time = t;
        $('.timeLeft').html('Time Left: ' + questionTimer.time);
      },
      gameTimeout: function(){
        timeout = setTimeout(questionTimer.timeUp, 1000*16);
      },
      count: function() {
        $('.timeLeft').html('Time Left: ' +questionTimer.time);
        questionTimer.time--;
      },
      countDown: function(){
        counter = setInterval(questionTimer.count,1000);
      },
      stopTimer: function(){
        clearInterval(counter);
      },
      timeUp: function(){
        wrong++;
        questionTimer.reset(5)
        $('.answers').html('<h2>Incorrect! The answer is ' + activeQuestion.answer + ' </h2>');
        setTimeout(game, 5000);
      },
    };
  
    // Run this to make sure there are still questions left
    function gameOver() {
      if (Object.keys(questions).length === 0) {
        questionTimer.stopTimer();
        $('.game').hide();
        $('.results').show();
        $('.correct').html('Number Correct: ' + correct);
        $('.wrong').html('Number Incorrect: ' + wrong);
        activeQuestion = false;
      };
    };
  
    // Check if selected answer is correct or incorrect
    function answerCheck() {
      if (answer == activeQuestion.answer && questionTimer.time > 0) {
        correct++;
        questionTimer.reset(2);
        $('.answers').html('<h2>Correct! The answer is ' + activeQuestion.answer + ' </h2>');
        setTimeout(game, 2000);   
      }
        
      if (answer != activeQuestion.answer){
        questionTimer.timeUp();
      }
    }
  
     //Randomize order of possible answers
    function randomize() {
      activeQuestion.choices.sort(function() { 
        return 0.5 - Math.random(); 
      });
    };
  
    // Starts up the game
    function game(){
  
      // Checks to see if there are no more questions first
      gameOver();
  
      // If there are still questions left
      if (Object.keys(questions).length > 0) {
  
        // Get Question
        var keys = Object.keys(questions);
        var objIndex = keys[ keys.length * Math.random() << 0];
        activeQuestion = questions[objIndex];
  
        // Reorder the choices so it's not obvious
        randomize();
  
        // Delete question so it can't be pulled again
        delete questions[objIndex];
  
        // Empty out answer area from previous question
        $('.answers').empty();
  
        // Stop and Reset timer incase it was running
        questionTimer.stopTimer();
        questionTimer.reset(15);
        questionTimer.gameTimeout()
  
        // Start Timer
        questionTimer.countDown();
  
        // Place question information into .game area
        $('.question').html(activeQuestion.question);
        // Reset counter
        i=0;
  
        //Create buttons for possible answers
        $(activeQuestion.choices).each(function() {
        $('.answers').append('<button class="btn btn-lg option text-center bg-info text-light">' + activeQuestion.choices[i] + '</button>');
        i++;
        });
      }; 
  
      // When you click on a possible answer
      $('.option').on('click', function(){
          answer = $(this).html();
          answerCheck();
          clearTimeout(timeout);
        });
    };
  
     // New Game Function
      // Resets score to zero
      // Sets new time countdown
    function newGame() {
      $('.results').hide();
      // questions = questionInfo;
      correct = 0;
      wrong = 0;
      $('.game').show();
    }
  
   
    $('.home').on('click','.start',function(){
      setQuestions();
      newGame();
      
      game();
    });
      
  
  });