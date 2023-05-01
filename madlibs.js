/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
function parseStory(rawStory) {

  let newArr = []
  let array = rawStory.split(" ")
  let storyArray = []

  const nReg = new RegExp('[\[n\]]')
  const vReg = new RegExp('[\[v\]]')
  const aReg = new RegExp('[\[a\]]')

  for (let j = 0; j < array.length; j++) {

    if (array[j].slice(-1) === "." || array[j].slice(-1) === ",") {

      storyArray.push(array[j].slice(0, array[j].length - 1), array[j].slice(-1))
    } else {
      storyArray.push(array[j])
    }
  }


  for (let i = 0; i < storyArray.length; i++) {
    let obj = { word: "", pos: "" }
    if (nReg.test(storyArray[i])) {
      obj.word = storyArray[i].slice(0, -3)
      obj.pos = "Noun"
      newArr.push(obj)
    } else if (vReg.test(storyArray[i])) {
      obj.word = storyArray[i].slice(0, -3)
      obj.pos = "Verb"
      newArr.push(obj)
    } else if (aReg.test(storyArray[i])) {
      obj.word = storyArray[i].slice(0, -3)
      obj.pos = "Adjective"
      newArr.push(obj)
    } else {
      obj.word = storyArray[i]
      delete obj.pos
      newArr.push(obj)
    }
  }

  ////////////////////////////////////////////////////////////////////

  const madLibsEdit = document.querySelector(".madLibsEdit")
  const madLibsPreview = document.querySelector(".madLibsPreview")
  const body = document.querySelector("body")
  const header = document.createElement("h1")
  const subHeader = document.createElement("h2")
  const edit = document.createElement("h3")
  const preview = document.createElement("h3")
  header.innerHTML = `Mad Libs`
  subHeader.innerHTML = `The Witcher Edition`
  edit.innerHTML = `Edit`
  preview.innerHTML = `Preview`
  body.insertBefore(header, body.firstChild)
  body.insertBefore(subHeader, body.firstChild.nextSibling)
  madLibsEdit.appendChild(edit)
  madLibsPreview.appendChild(preview)

  for (let index = 0; index < newArr.length; index++) {

    if (newArr[index].pos !== undefined) {

      madLibsEdit.innerHTML = madLibsEdit.innerHTML + ` <input maxlength="20" placeholder="${newArr[index].pos}"></input>`
      madLibsPreview.innerHTML = madLibsPreview.innerHTML + ` <span></span>`
    } else if (newArr[index].word === "." || newArr[index].word === ",") {
      madLibsEdit.innerHTML = madLibsEdit.innerHTML + `${newArr[index].word}`
      madLibsPreview.innerHTML = madLibsPreview.innerHTML + `${newArr[index].word}`
    } else {
      madLibsEdit.innerHTML = madLibsEdit.innerHTML + ` ${newArr[index].word}`
      madLibsPreview.innerHTML = madLibsPreview.innerHTML + ` ${newArr[index].word}`
    }
  }
  ///////////////////////////////////////////////////////////////////////

  const inputsArr = document.querySelectorAll("input")
  const pArr = document.querySelectorAll("span")

  for (let i = 0; i < inputsArr.length; i++) {
    inputsArr[i].value = localStorage.getItem(`${[i]}`)
    if (inputsArr[i].value !== "") {
      inputsArr[i].style.color = "rgb(140, 0, 0)"
    }
  }
  
  window.addEventListener("keyup", () => {

    for (let index = 0; index < pArr.length; index++) {

      pArr[index].innerHTML = inputsArr[index].value

    }
    for (let i = 0; i < inputsArr.length; i++) {
      localStorage.setItem(`${[i]}`, `${inputsArr[i].value}`)
    }
  })

  //////////////////////////////////////////////////////////////////////

  inputsArr.forEach(x => {
    x.addEventListener("blur", () => {
      if (x.value !== "") {
        x.style.color = "rgb(140, 0, 0)"
      }
    })
    x.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const currentInput = document.activeElement;
        for (let i = 0; i < inputsArr.length; i++) {
          if (inputsArr[i] === currentInput && i !== inputsArr.length - 1) {
            inputsArr[i + 1].focus()
          }
        }
      }
    })
  })
  ///////////////////////////////////////////////////////////////////////////////
  return { newArr }; // This line is currently wrong :)
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * NOTE: You should not be writing any code in the global namespace EXCEPT
 * declaring functions. All code should either:
 * 1. Be in a function.
 * 2. Be in .then() below.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    console.log(processedStory);
  });
