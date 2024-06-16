import React, { useState, useContext, useEffect } from "react";
import { FiUnlock } from "react-icons/fi";
import { auth } from "../config/firebase-config";
import {
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  Container,
  Form,
  Button,
  FormGroup,
  Label,
  Col,
  Input,
  Row,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "reactstrap";
import { UserContext } from "../context/userContext";
import { ReviewerContext } from "../context/reviewerContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignIn = () => {
  const context = useContext(UserContext);
  const reviewerContext = useContext(ReviewerContext);
  const [email, setEmail] = useState("rakesh@130.gmail.com");
  const [password, setPassword] = useState("Rakhi@130");
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserDetails = async (email) => {
    const apiUrl = `https://dark-sea-fd57.pabbathirakesh20005212.workers.dev/user?userEmail=${email}`;

    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const userDetails = await response.json();
        const userName = userDetails.UserName;
        const appUid = userDetails.UserId;

        reviewerContext.setReviewer({ email, name: userName, appUid });
        setIsLoading(false);

        toast("Account Logged in", { type: "success" });
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast("Error while fetching user data", { type: "error" });
    }
  };

  const handleSignin = () => {
    setIsLoading(true);

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      })
      .then((userCredential) => {
        const user = userCredential.user;
        context.setUser({ email: user.email, uid: user.uid });
        fetchUserDetails(user.email);
      })
      .catch((error) => {
        console.error(error);
        toast(error.message, { type: "error" });
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isLoading) {
      toast("Signing in...", { type: "info", autoClose: true });
    } else {
      toast.dismiss();
    }
  }, [isLoading]);

  const defaultlogin = () => {
    setEmail("rakesh@130.gmail.com");
    setPassword("Rakhi@130");
    handleSignin();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignin();
  };

  if (context.user?.uid) {
    return <Navigate to="/" />;
  }

  return (
    <div
      style={{
        height: "85vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}
    >
      <Container className="text-center">
        <Row>
          <Col lg={6} className="offset-lg-3 mt-4">
            <Card body inverse id="signin-card">
              <Form onSubmit={handleSubmit}>
                <CardHeader id="signin-header">
                  Sign In
                  <FiUnlock
                    className="ml-auto"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="To Login as Guest Click Here"
                    onClick={defaultlogin}
                    size={30}
                  />
                  Guest login
                </CardHeader>
                <CardBody id="signin-body">
                  <FormGroup row>
                    <Label for="email" sm={3}>
                      Email
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="password" sm={3}>
                      Password
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" block id="signin-button">
                    Sign In
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignIn;
