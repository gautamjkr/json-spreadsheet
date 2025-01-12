import "./App.css";
import Spreadsheet from "./Spreadsheet";
import { Layout } from "antd";

const { Header, Footer, Content } = Layout;

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 80,
  backgroundColor: "teal",
  fontSize: 24,
  fontWeight: "bolder",
  position: "fixed",
  top: 0,
  zIndex: 9,
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const footerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function App() {
  return (
    <Layout style={{ overflow: "hidden" }}>
      <Header style={headerStyle}>JSON Spreadsheet</Header>
      <Content style={{ marginTop: "80px" }}>
        <Spreadsheet />
      </Content>
      <Footer style={footerStyle}>
        JSON Spreadsheet ©{new Date().getFullYear()} Created by
        <a href="https://www.linkedin.com/in/gautamjkr" target="_blank">
          Gautam Kumar
        </a>
      </Footer>
    </Layout>
  );
}

export default App;
