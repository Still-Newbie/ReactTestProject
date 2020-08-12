import React from "react";
import "./styles.css";

export default function App() {
  return (
    <React.StrictMode>
      <TopMenu />
      <Contents />
    </React.StrictMode>
  );
}

class TopMenu extends React.Component {
  render() {
    let a = GetMenus();
    let url = a.logo_url;
    let menu = a.store.map((data, i) => (
      <li
        ref={i + 1}
        className={"mouseover"}
        onClick={() => ChangeMenu(1, `${data.CATEGORY}`)}
      >
        {data.CATEGORYNM}
      </li>
    ));
    return (
      <div id="TopMenu">
        <div
          id="logo_div"
          className={"mouseover"}
          onClick={() => ChangeMenu(1, "main")}
        >
          <img src={url} alt="logo" />
        </div>
        <div id="MenuCategory">
          <ul>{menu}</ul>
        </div>
      </div>
    );
  }
}

class Contents extends React.Component {
  constructor(props) {
    super(props);
    this.state = { category: "main" };
  }
  render() {
    let sidemenu = GetSideMenus(this.state.category);
    return (
      <>
        {sidemenu ? (
          <div id="SideMenu">
            <SideMenu category={this.state.category} menus={sidemenu} />
          </div>
        ) : (
          ""
        )}
        <div id="Detail">
          <Detail category={this.state.category} />
        </div>
      </>
    );
  }
}

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { category: props.category };
    this.menu = props.menu;
  }
  render() {
    let sidemenu = this.menu.store.map((data, i) => (
      <li
        ref={i + 1}
        className={"mouseover"}
        onClick={() => ChangeMenu(2, `${data.CATEGORY}`)}
      >
        {data.CATEGORYNM}
      </li>
    ));
    return <ul>{sidemenu}</ul>;
  }
}

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { category: props.category };
  }
  render() {
    return <p>{this.state}</p>;
  }
}

function ChangeMenu(lvl, ca) {
  if (lvl === 1) Contents.setState({ category: ca });
  else Detail.setState({ category: ca });
}

function GetMenus() {
  return {
    logo_url: "http://www.itsco.co.kr/images/main/img_logo_footer.png",
    store: [
      { CATEGORY: "CA1MENU1", CATEGORYNM: "메뉴1" },
      { CATEGORY: "CA1MENU2", CATEGORYNM: "메뉴2" },
      { CATEGORY: "CA1MENU3", CATEGORYNM: "메뉴3" }
    ]
  };
}

function GetSideMenus(category) {
  if (category === "CA1MENU1")
    return {
      store: [
        { CATEGORY: "CA2MENU1", CATEGORYNM: "서브메뉴1" },
        { CATEGORY: "CA2MENU2", CATEGORYNM: "서브메뉴2" },
        { CATEGORY: "CA2MENU3", CATEGORYNM: "서브메뉴3" }
      ]
    };
  else return false;
}
