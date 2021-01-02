import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, FormControl, InputGroup, Jumbotron, Row, Spinner } from "react-bootstrap";
import styled from "styled-components";
import ValidatedFormGroup from "../components/ValidatedFormGroup";
import ValidityStatusEnum from "../enums/ValidityStatus";
import delay from "../helper/delay";

const StyledBrandDiv = styled.div`
  animation: brand-entrance-anim;
  animation-duration: 2s;

  @keyframes brand-entrance-anim {
    0%, 10% {
      opacity: 0;
    }
  }
`;

const StyledSubmitDiv = styled.div`
  & #submit-button {
    visibility: visible;
    opacity: 100;

    transition-duration: 0.5s;
  }

  & #submit-spinner {
    visibility: hidden;
    opacity: 0;

    transition-duration: 0.5s;
  }

  &.submit-anim-active {
    & #submit-button {
      visibility: hidden;
      opacity: 0;

      transition-duration: 0.5s;
    }

    & #submit-spinner {
      visibility: visible;
      opacity: 100;

      transition-duration: 0.5s;
    }
  }
`;

const StyledContainer = styled(Container)`
  background-color: ${props => props.theme.primary};
`;

const StyledCard = styled(Card)`
  background-color: whitesmoke;
  border-color: ${props => props.theme.primaryDark};
  border-width: 0.1rem;
  box-shadow: 0px 6px 15px;
  transform: rotateY(0turn);

  &.entrance-anim-active {
    animation: entrance-anim;
    animation-duration: 2s;
  }

  &.success-anim-active {
    animation: success-anim;
    animation-duration: 3s;
  }

  & #success-card-body {
    visibility: hidden;
    opacity: 0;

    &.success-anim-active {
      animation: success-body-anim;
      animation-duration: 3s;
    }

    @keyframes success-body-anim {
      10% {
        visibility: hidden;
        opacity: 0;
      }
      15%, 85% {
        visibility: visible;
        opacity: 1;
      }
      90% {
        visibility: hidden;
        opacity: 0;
      }
    }
  }

  & #form-card-body {
    visibility: visible;
    opacity: 1;

    &.success-anim-active {
      animation: form-body-anim;
      animation-duration: 3s;
    }

    @keyframes form-body-anim {
      10% {
        visibility: visible;
        opacity: 1;
      }
      15%, 85% {
        visibility: hidden;
        opacity: 0;
      }
      90% {
        visibility: visible;
        opacity: 1;
      }
    }
  }

  @keyframes success-anim {
    10% {
      transform: rotateY(90deg);
    }
    20%, 80% {
      transform: rotateY(180deg);
    }
    90% {
      transform: rotateY(270deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  }

  @keyframes entrance-anim {
    from {
      transform: translateY(2rem);
      opacity: 0;
    }
  }
`;

const StyledButton = styled(Button)`
  background-color: ${props => props.theme.secondary};
  color: ${props => props.theme.textOnSecondary};
  border-width: 0.1rem;
  border-color: ${props => props.theme.secondaryDark};
  box-shadow: 2px 2px 5px !important;

  transition: transform 0.5s, box-shadow 0.5s;

  :hover {
    background-color: ${props => props.theme.secondaryLight};
    color: ${props => props.theme.textOnSecondary};
    border-width: 0.1rem;
    border-color: ${props => props.theme.secondaryDark};
    box-shadow: 2px 2px 5px;

    box-shadow: 2px calc(2px + 0.2rem) 10px !important;
    transform: translateY(-0.2rem);

    transition: transform 0.5s, box-shadow 0.5s;
  }

  :active {
    background-color: ${props => props.theme.secondaryLight} !important;
    color: ${props => props.theme.textOnSecondary} !important;
    border-width: 0.1rem !important;
    border-color: ${props => props.theme.secondaryDark} !important;

    box-shadow: 2px calc(2px + 0.1rem) 7px !important;
    transform: translateY(-0.1rem) scale(0.95, 0.95);

    transition: transform 0.1s, box-shadow 0.1s;
  }

  :focus:hover {
    background-color: ${props => props.theme.secondaryLight} !important;
    color: ${props => props.theme.textOnSecondary} !important;
    border-width: 0.1rem !important;
    border-color: ${props => props.theme.secondaryDark} !important;
  }

  :focus {
    background-color: ${props => props.theme.secondary} !important;
    color: ${props => props.theme.textOnSecondary} !important;
    border-width: 0.1rem !important;
    border-color: ${props => props.theme.secondaryDark} !important;
  }
`;

const StyledFormControl = styled(Form.Control)`
  border-color: ${props => props.theme.secondaryDark};
  border-width: 0.1rem;
  height: 2.5em;
`;

const StyledInputGroupText = styled(InputGroup.Text)`
  border-color: ${props => props.theme.secondaryDark};
  background-color: ${props => props.theme.secondaryLight};
  border-width: 0.1rem;
  border-right-width: 0rem;
  height: 2.5em;
`;

const StyledPath = styled.path`
  fill: ${props => props.theme.primary};
`;

const StyledSpinner = styled(Spinner)`
  color: ${props => props.theme.primary}
`;

const HomePage = () => {
  const [shortName, setShortName] = useState("");
  const [shortNameValidity, setShortNameValidity] = useState(null);
  const [shortNameMessage, setShortNameMessage] = useState("");

  const [longUrl, setLongUrl] = useState("");
  const [longUrlValidity, setLongUrlValidity] = useState(null);
  const [longUrlMessage, setLongUrlMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const playEntranceAnim = async () => {
      var elements = document.getElementsByClassName("entrance-animatable");

      await delay(2000);

      for (var x = 0; x < elements.length; x++) {
        elements[x].classList.remove("entrance-anim-active");
      }
    };

    playEntranceAnim();
  }, []);

  useEffect(() => {
    let cancellationToken = {cancel: false};

    const checkValidity = async () => {
      await checkShortNameValidity(shortName, cancellationToken);
    };

    if (!(shortName === "" && shortNameValidity === null)) {
      checkValidity();
    }

    return () => {
      cancellationToken.cancel = true;
    };
  }, [shortName]);

  const resetState = () => {
    setLongUrlValidity(null);
    setLongUrl("");
    setLongUrlMessage("");

    
    setShortNameValidity(null);
    setShortName("");
    setShortNameMessage("");
  };

  const createShortenedUrl = async () => {
    setIsSubmitting(true);
    enableSubmitTransition();

    await delay(1000);

    if (longUrl === null || shortName === null) {
      await checkLongUrlValidity(longUrl);
      await checkShortNameValidity(shortName);
    }

    if (longUrlValidity === ValidityStatusEnum.valid && shortNameValidity === ValidityStatusEnum.valid) {
      try {  
        var response = await fetch('/api/url', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            shortName: shortName,
            longUrl: longUrl,
          })
        });
      } catch(err) {
        window.alert("Uh oh. Something went wrong.");
        resetState();
      }

      if (response.status === 200) {
        await playSuccessAnimation();
      } else {
        window.alert(`${response.status}:${(await response.json()).error ?? response.statusText}`);
        resetState();
      }
    }

    setIsSubmitting(false);
    disableSubmitTransition();
  }

  const playSuccessAnimation = async () => {
    var elements = document.getElementsByClassName("success-animatable");

    for (var x = 0; x < elements.length; x++) {
      elements[x].classList.add("success-anim-active");
    }

    await delay(1500);

    resetState();

    await delay(1500);
    
    for (var x = 0; x < elements.length; x++){
      elements[x].classList.remove("success-anim-active");
    }
  };

  const enableSubmitTransition = async () => {
    var elements = document.getElementsByClassName("submit-animatable");

    elements[0].classList.add("submit-anim-active");
  }

  const disableSubmitTransition = async () => {
    var elements = document.getElementsByClassName("submit-animatable");

    elements[0].classList.remove("submit-anim-active");
  }

  const checkLongUrlValidity = (value) => {
    if (value === "") {
      setLongUrlValidity(ValidityStatusEnum.invalid);
      setLongUrlMessage("Required field");
      return;
    }

    var urlRegex = /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/;
    var isValid = urlRegex.test(value);

    if (isValid) {
      setLongUrlMessage("OK");
      setLongUrlValidity(ValidityStatusEnum.valid);
    } else {
      setLongUrlMessage("Not a valid URL");
      setLongUrlValidity(ValidityStatusEnum.invalid);
    }
  }

  const checkShortNameValidity = async (value, cancellationToken) => {
    if (value === "") {
      setShortNameValidity(ValidityStatusEnum.invalid);
      setShortNameMessage("Required field");
      return;
    }

    var shortNameRegex = /^[a-zA-Z0-9]([\(\)a-zA-Z0-9\.\_\-])*$/;
    if (!shortNameRegex.test(value)) {
      setShortNameValidity(ValidityStatusEnum.invalid);
      setShortNameMessage("Not a valid short URL");
      return;
    }

    setShortNameValidity(ValidityStatusEnum.neutral);
    setShortNameMessage("checking short url availability...");
    var response = await fetch(`api/url/check-availability/${value}`, {
      method: "GET",
      headers: {
        "Content-Type" : "application/json"
      }
    });

    if (response.status === 200) {
      var body = await response.json();

      if (!body.isAvailable && !(cancellationToken?.cancel)) {
        setShortNameValidity(ValidityStatusEnum.invalid);
        setShortNameMessage("Short url taken. Try something else");
        return;
      }
    } else {
      if (!(cancellationToken?.cancel)) {
        window.alert(`${response.status}:${(await response.json()).error ?? response.statusText}`);
        resetState();
      }
    }

    if (!(cancellationToken?.cancel)) {
      setShortNameValidity(ValidityStatusEnum.valid);
      setShortNameMessage("OK");
    }
  }

  return(
   <StyledContainer fluid className="h-100 d-flex">
      <Row className="w-100 m-0 align-self-center justify-content-center">
        <Col className="col-12 col-lg-10 col-xl-8 mx-auto">
          <StyledBrandDiv>
            <h1 className="text-center mb-0 display-5"><span>short.</span>gldnpz.com</h1>
            <h5 className="text-center mb-4 display-5">the not-so-short url shortener</h5>
          </StyledBrandDiv>
          <StyledCard className="success-animatable entrance-animatable entrance-anim-active">
            <Card.Body>
              <div 
                id="success-card-body" 
                style={{zIndex: "2", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%) rotateY(180deg)"}} 
                className="success-animatable"
              >
                <svg style={{width: "7rem", height: "7rem"}} viewBox="0 0 24 24" className="d-block m-auto">
                  <StyledPath d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                </svg>
                <h1 className="text-center">success</h1>
              </div>
              <div id="form-card-body" style={{zIndex: "1"}} className="success-animatable">
                <Form>
                  <ValidatedFormGroup label="Long URL" validity={longUrlValidity} message={longUrlMessage}>
                    <StyledFormControl type="longUrl" readOnly={isSubmitting} placeholder="https://example.com/path" value={longUrl} onChange={(e) => {
                      setLongUrl(e.target.value);

                      checkLongUrlValidity(e.target.value);
                    }}/>
                  </ValidatedFormGroup>

                  <ValidatedFormGroup label="Short URL" validity={shortNameValidity} message={shortNameMessage}>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <StyledInputGroupText>short.gldnpz.com/</StyledInputGroupText>
                      </InputGroup.Prepend>
                      <StyledFormControl type="shortUrl" readOnly={isSubmitting} placeholder="example" value={shortName} onChange={(e) => {
                        setShortName(e.target.value);
                      }}/>
                    </InputGroup>
                  </ValidatedFormGroup>

                  <StyledSubmitDiv className="d-flex justify-content-center submit-animatable">
                    <div id="submit-spinner" className="align-self-center" style={{zIndex: "1", position: "absolute"}}>
                      <StyledSpinner animation="border"/>
                    </div>
                    <div id="submit-button" style={{zIndex: "2"}}>
                      <StyledButton disabled={isSubmitting} style={{width: "7rem"}} onClick={createShortenedUrl}>
                        Save
                      </StyledButton>
                    </div>
                  </StyledSubmitDiv>
                </Form>
              </div>
            </Card.Body>
          </StyledCard>
          <StyledBrandDiv>
            <h5 className="text-center mt-5">©Firdaus Bisma S</h5>
          </StyledBrandDiv>
        </Col>
      </Row>
   </StyledContainer>
  );
}

export default HomePage;