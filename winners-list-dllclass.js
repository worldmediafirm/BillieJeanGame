class Node {
    constructor(value) {
      this.value = value;
      this.prev = null;
      this.next = null;
    }
  }
  
  class WinnersQueue {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
      this.isEmailSubmitted = false; // Add this variable
    }
  
  // Modified enqueue method in DoublyLinkedList class
  enqueue(email) {
    // Check if the email has already been submitted
    if (this.isEmailSubmitted) {
      alert('Email has already been submitted.');
      return;
    }
  
    // Check if the email already exists in the list
    if (this.hasEmail(email)) {
      alert('Email already exists in the list.');
      return;
    }
  
    const newNode = new Node(email);
  
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    this.isEmailSubmitted = true; // Set the flag to true after adding the email
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
  
  // Method to check if an email already exists in the list
  hasEmail(email) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.email === email) {
        return true;
      }
      currentNode = currentNode.next;
    }
    return false;
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

  