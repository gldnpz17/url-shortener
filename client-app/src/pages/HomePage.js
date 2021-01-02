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
  box-shadow: 0px 0.5rem 1.6rem;
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

const StyledSocialMediaContainer = styled.span`
  background-color: ${props => props.theme.primaryLight};
  border-radius: 1.5rem;
  transition-duration: 0.5s;

  animation-name: socmed-entrance-anim;
  animation-duration: 3s;

  :hover > a > svg {
    transform: scale(0.9);
    color: ${props => props.theme.primaryDark}
  }

  :hover {
    box-shadow: 0rem 0.3rem 0.6rem;
    transform: translateY(-0.1rem);
  }

  @keyframes socmed-entrance-anim {
    from {
      opacity: 0;
    }
  }
`;

const StyledSocialMediaLink = styled.a`
  & > svg {
    color: black;
    width: 2rem;
    height: 2rem;
    transition-duration: 0.2s;

    :hover {
      transform: scale(1.1) !important;
      color: ${props => props.theme.secondaryDark} !important;
    }

    :active {
      transform: scale(1) translateY(0.2rem) !important;
      color: ${props => props.theme.secondaryDark} !important;
    }
  }
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

    await delay(2500);

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
    await delay(500);

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
                      <StyledButton style={{width: "7rem"}} onClick={createShortenedUrl}>
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
          <div className="d-flex justify-content-center">
            <StyledSocialMediaContainer className="py-1 px-2 mt-1">
              <StyledSocialMediaLink href="https://gldnpz.com">
                <svg className="mx-1" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                </svg>
              </StyledSocialMediaLink>
              <StyledSocialMediaLink href="https://github.com/gldnpz17">
                <svg className="mx-1" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                </svg>
              </StyledSocialMediaLink>
              <StyledSocialMediaLink href="https://twitter.com/gldnpz">
                <svg className="mx-1" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
                </svg>
              </StyledSocialMediaLink>
            </StyledSocialMediaContainer>
          </div>
        </Col>
      </Row>
   </StyledContainer>
  );
}

export default HomePage;