class Node {
    constructor(value) {
      this.value = value;
      this.prev = null;
      this.next = null;
    }
  }
  
  class WinnersQueue { //Doubly linked list data structure
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
      this.isEmailSubmitted = false;
    }
  
    enqueue(value) {
      const newNode = new Node(value);
  
      if (this.length === 0) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
      }
  
      this.length++;
    }
  
    dequeue() {
      if (this.length === 0) {
        return null;
      }
  
      const removedNode = this.head;
  
      if (this.length === 1) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
        this.head.prev = null;
      }
  
      removedNode.next = null;
      this.length--;
  
      return removedNode.value;
    }
  
    isEmpty() {
      return this.length === 0;
    }
  
    size() {
      return this.length;
    }
  }

  /*// Assume you have a submit button with the id "submitBtn"
const submitButton = document.querySelector("#button");

// Assume you have an input field with the id "playerNameInput"
const playerNameInput = document.querySelector("#playerNameInput");

submitButton.addEventListener("click", () => {
  const playerName = playerNameInput.value;
  queue.enqueue(playerName);
  playerNameInput.value = ""; // Clear the input field after enqueueing

  // Perform any additional actions you want after enqueuing, such as updating the UI
});*/

  