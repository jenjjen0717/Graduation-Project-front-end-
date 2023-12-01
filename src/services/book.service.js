import axios from "axios";
const API_URL = "http://localhost:8080/api/book";

class BookService {
  //home
  getBookList() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL, {
      headers: {
        Authorization: token,
      },
    });
  }
  //home
  getRecentBook() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/recent", {
      headers: {
        Authorization: token,
      },
    });
  }
  //manual input
  postBookInfo(title, author, status) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/info",
      { title, author, status },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  //book note info
  getInfo(title) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/info/" + title, {
      headers: {
        Authorization: token,
      },
    });
  }
  //book note info
  editInfo(oldTitle, title, author, status) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.patch(
      API_URL + "/info/" + oldTitle,
      { title, author, status },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  //navbar
  searchBook(keyword) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/search/" + keyword, {
      headers: {
        Authorization: token,
      },
    });
  }
  //book note
  createExcerpt(title, paragraph, page, note) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/excerpt/" + title,
      { paragraph, page, note },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  //book note
  deleteExcerpt(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.delete(API_URL + "/excerpt/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  editExcerpt(_id, paragraph, page, note) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.patch(
      API_URL + "/excerpt/" + _id,
      { paragraph, page, note },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

export default new BookService();
