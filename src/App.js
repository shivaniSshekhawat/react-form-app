import "./App.css";
import { Container, Typography } from "@mui/material";
import MyForm from "./MyForm";
function App() {
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        React Form with Validation
      </Typography>
      <MyForm />
    </Container>
  );
}

export default App;
