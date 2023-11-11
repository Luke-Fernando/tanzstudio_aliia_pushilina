function loadData() {
  // const goalsElems = document.querySelectorAll("[data-goal]");
  // const goals = [...goalsElems];
  //   var f = document.getElementById("fname");
  //   var form = new FormData();
  //   form.append("f", f.value);
  let request = new XMLHttpRequest();

  request.onreadystatechange = async function () {
    if (request.readyState == 4) {
      let response = JSON.parse(request.responseText);
      //   console.log(response.goals.goal[0].image["@attributes"].src);
      await new Promise((resolve) => {
        generateGoals(response.goals);
        resolve();
      });
      document.onreadystatechange = async () => {
        if (document.readyState === "complete") {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          document.getElementById("spinner").style.display = "none";
        }
      };
      //   goals.forEach(goal => {
      //     let goalImg = goal.querySelector("[data-goal-img]");
      //   })
    }
  };

  request.open("POST", "../../src/load_data.php", true);
  request.send();
}

loadData();

function generateGoals(goalsObj) {
  const goalsElems = document.querySelectorAll("[data-goal]");
  const goals = [...goalsElems];
  for (let i = 0; i < 3; i++) {
    let goal = goalsObj.goal[i];
    let goalImg = goals[i].querySelector("[data-goal-img]");
    let goalTitle = goals[i].querySelector("[data-goal-title]");
    let goalDescription = goals[i].querySelector("[data-goal-description]");
    goalImg.setAttribute("src", `./assets/images/goals/${goal.image["@attributes"].src}`);
    goalTitle.innerText = goal.title;
    goalDescription = goal.description;
  }
}
