//import logo from './logo.svg';
import React from "react";
import ToDo from "./ToDo";
import AddToDo from "./AddToDo";
import './App.css';
import { List, Paper, Container } from "@mui/material";


class App extends React.Component {
  constructor(props) {
    super(props);
    // 3개의 객체를 가진 배열을 생성
    this.state = {
      items: []
    };
    // this.state = {
    //   items: [{ id: 0, title: "react", done: true },
    //   { id: 1, title: "vue", done: false },
    //   { id: 2, title: "angular", done: true }]
    // };
  }

  // 화면이 보여질 때 마다 호출되는 수명주기 함수
  componentDidMount() {
    // ajax 요청 객체 생성
    let request = new XMLHttpRequest();
    // 요청 준비
    request.open('GET', "http://127.0.0.1:80/todo/?userid=adam");

    // 요청
    request.send();
    // 응답 처리
    request.addEventListener('load', () => {
      // Json 문자열을 데이터로 변환
      let data = JSON.parse(request.responseText);
      console.log(data)
      // 서버에서 받아온 데이터를 state에 대입해서 화면에 출력
      this.setState({ items: data })
    });
  }

  add = (item) => {
    // react는 props는 수정할 수 없고
    // state는 수정이 가능하지만 원본을 직접 수정하는 것은 안되고
    // setState 메서드를 이용해서만 수정이 가능합니다.

    // 배열에 데이터를 추가하기 위해서 state의 배열을 복사
    const thisItems = this.state.items;

    // item의 id와 done 값을 설정 - title 만 입력하기 떄문
    item.id = "ID-" + thisItems.length;
    item.done = false;

    // 복사한 데이터에 데이터를 추가
    thisItems.push(item)
    // 복사한 데이터를 다시 state에 적용
    this.setState({ ites: thisItems });
  }

  delete = (item) => {
    // state 나 props의 데이터는 직접 편집이 안됩니다.
    const thisItems = this.state.items;

    // 복사본에서 item을 제거
    // filter 함수는 리턴 타입이 boolean 함수를 매개변수로 받아서
    // 리턴 결과가 true 인 데이터만 모아서 배열로 리턴하는 함수 입니다.
    const newItems = thisItems.filter((e) => e.id !== item.id);

    // 원본에 다시 복사
    this.setState({ items: newItems })
  }

  render() {
    //배열을 순회하면서 출력할 내용을 생성
    // item은 배열을 순회할 떄 각각의 데이터이고 idx는 인덱스
    // 배열을 순회하면서 출력물을 만들 떄는 key를 설정해주어야 합니다.
    // key를 설정하지 않으면 출력에는 문제가 없지만 콘솔에 에러가 출력됩니다.

    // <ToDo item={this.state.item} />
    //var display = this.state.items.map((item, idx) => (
    var display = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <ToDo item={item} key={item.id} delete={this.delete} />
          ))}
        </List>
      </Paper>
    );
    return (
      <div className="App">
        <Container maxWidth="md">
          <AddToDo add={this.add} />
          {display}
        </Container>

      </div>
    );
  }
}

export default App;
