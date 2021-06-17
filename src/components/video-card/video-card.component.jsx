import React from "react";
import { Button, Form } from "react-bootstrap";
import { IconSVG } from "../icon-svg";
import LinkCustom from "../link/link.component";
import "./video-card.styles.scss";
import TestQuestion from "../test-question/test-question.component";
import Dropzone from "react-dropzone";
import AnswerQuestion from "../answer-question/answer-question.component";
import TestCreation from "../test-creation/test-creation.component";
import { fetchAnswers } from "./../../utils/firebase/firestore";
import DefaultLessonImage from "./../../assets/default-lesson-img.png";

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

export default class VideoCard extends React.Component {
  constructor(props) {
    super(props);
    const { videoObject } = this.props;

    this.state = {
      fetch: true,
      date: Date.now(),
      isEditState:
        this.props.isNewCreated || this.props.isNewCourse ? true : false,
      isAddResourcesState: false,
      isUploadVideo: false,
      links: videoObject.links,
      videoLink: videoObject.video_link,
      isToggleTest: false,
      isToggleAnswer: false,
      filePath: "",
      isToggleEditQuestion: false,
      lesson_name: videoObject.title,
      lesson_description: videoObject.description,
    };

    this.startEdit = this.startEdit.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.startAddResources = this.startAddResources.bind(this);
    this.saveResources = this.saveResources.bind(this);
    this.startUploadVideo = this.startUploadVideo.bind(this);
    this.saveUploadVideo = this.saveUploadVideo.bind(this);

    this.handleFetchAnswers();
  }

  componentDidUpdate = () => {};

  startEdit() {
    this.setState((state) => ({
      isEditState: true,
    }));
  }

  startAddResources() {
    let currentState = this.state.isAddResourcesState;
    this.setState((state) => ({
      isAddResourcesState: !currentState,
    }));
  }

  startUploadVideo() {
    let currentState = this.state.isUploadVideo;
    this.setState((state) => ({
      isUploadVideo: !currentState,
    }));
  }

  saveEdit() {
    const { videoObject } = this.props;
    this.setState((state) => ({
      isEditState: false,
      isAddResourcesState: false,
      isUploadVideo: false,
    }));
    this.props.handleUpdateLesson(videoObject.id, {
      title: this.state.lesson_name,
      description: this.state.lesson_description,
    });
  }

  handleSaveQuestions = (data) => {
    const { videoObject } = this.props;
    this.props.handleSaveQuestions(videoObject.id, data);
    this.setState({ isToggleEditQuestion: false });
  };

  handleSaveAnswers = (data) => {
    let { videoObject, topic, course_id } = this.props;
    const newData = data.map((val) => ({
      lesson_id: videoObject.id,
      topic_id: topic.id,
      course_id,
      ...val,
    }));
    this.props.handleSaveAnswers(newData);
    this.handleFetchAnswers();
  };

  handleFetchAnswers = () => {
    let { videoObject } = this.props;
    fetchAnswers(videoObject.id)
      .then((answers) => {
        this.setState(answers, () => {
          console.log("New state:", this.state);
        });
      })
      .catch((err) => {
        alert("handleFetchAnswers:" + err);
        console.log(err);
      });
  };

  getPercentageCompletion = () => {};

  handleDeleteLesson = () => {
    const { videoObject } = this.props;
    this.props.handleDeleteLesson(videoObject.id);
  };

  saveResources() {
    const { videoObject } = this.props;
    this.setState((state) => ({
      isAddResourcesState: false,
    }));
    this.props.handleUpdateVideoLink(videoObject.id, {
      links: this.state.links,
    });
  }
  saveUploadVideo() {
    const { videoLink } = this.state;
    const { videoObject } = this.props;
    if (videoLink) {
      videoObject.link = videoLink;
      // updateVideoLink(videoLink);
      this.props.handleUpdateLessonVideoLink(videoObject.id, {
        video_link: videoLink,
      });
    }

    this.setState((state) => ({
      isUploadVideo: false,
    }));
  }

  toggleTest = (value) => {
    this.setState({
      isToggleTest: value,
    });
  };

  toggleAnswer = (value) => {
    this.setState({
      isToggleAnswer: value,
    });
  };

  toggleEditQuestion = (value) => {
    this.setState({
      isToggleEditQuestion: value,
    });
  };

  appendLink = () => {
    const { links } = this.state;
    const link = {
      name: "",
      url: "https://",
    };
    links.push(link);
    this.setState({ links });
  };

  deleteLink = (index) => {
    const { links } = this.state;
    links.splice(index, 1);
    this.setState({ links });
  };

  onChangeData = (data, index) => {
    let currentData = this.state.links;
    currentData[index - 1] = data;
    this.setState({ links: currentData });
  };

  onChangeVideoLink = (event) => {
    if (event) {
      let videoLink = event.target.value;
      this.setState({ videoLink });
      this.setState((state) => ({
        filePath: "",
      }));
    }
  };

  removeVideoLink = () => {
    let currentFilePath = this.state.filePath;
    this.setState({ videoLink: null });
    this.youtubeLinkRef.current.value = "";
    this.setState((state) => ({
      filePath: currentFilePath,
    }));
  };

  //DRAP & DROP
  dragStart = (e) => {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.dragged);
  };

  dragEnd = (e) => {
    e.stopPropagation();
    this.dragged.style.display = "block";
    this.dragged.parentNode
      .querySelectorAll(".placeholder")
      .forEach((n) => n.remove());

    // update state
    let data = this.state.links;
    let from = Number(this.dragged.dataset.id)
      ? Number(this.dragged.dataset.id)
      : 0;
    let to = Number(this.over.dataset.id) ? Number(this.over.dataset.id) : 0;
    this.setState({
      links: this.moveItemInArrayFromIndexToIndex(data, from, to),
    });
  };

  openWin(url) {
    window.open(url);
  }

  moveItemInArrayFromIndexToIndex = (array, fromIndex, toIndex) => {
    if (fromIndex === toIndex) return array;

    const newArray = [...array];

    const target = newArray[fromIndex];
    const inc = toIndex < fromIndex ? -1 : 1;

    for (let i = fromIndex; i !== toIndex; i += inc) {
      newArray[i] = newArray[i + inc];
    }

    newArray[toIndex] = target;

    return newArray;
  };

  dragOver = (e) => {
    e.preventDefault();
    this.dragged.style.display = "none";

    if (e.target.className === "") {
      e.target.parentNode.append(placeholder);
      this.over = e.target;
      return;
    }

    if (
      e.target.className === "placeholder" ||
      e.target.className === "link-text form-control" ||
      e.target.className === "form-group" ||
      e.target.className === "link__wrapper" ||
      e.target.className === "link__delete" ||
      e.target.className === "link__title" ||
      e.target.className === "icon-svg-wrapper" ||
      e.target.className.baseVal == undefined ||
      e.target.className.baseVal !== null
    )
      return;
    this.over = e.target;
    e.target.parentNode.insertBefore(placeholder, e.target);
  };

  //DROPZONE VIDEO
  onDrop = (acceptedFiles) => {
    let filePath = acceptedFiles[0].path;
    this.setState((state) => ({
      filePath: filePath ? filePath : "",
    }));
  };

  removeUploadedVideo = () => {
    this.setState((state) => ({
      filePath: "",
    }));
  };

  render() {
    let {
      videoObject,
      showModal,
      isEditPage,
      isEditable,
      topic,
      course_id,
    } = this.props;
    let {
      isEditState,
      isAddResourcesState,
      isUploadVideo,
      links,
      isToggleTest,
      isToggleAnswer,
      isToggleEditQuestion,
      answers,
      current_mark,
      total_marks,
      questions_count,
      questions_answered,
    } = this.state;

    return (
      <div className="details video-card">
        <div className="video-container details-video-card">
          <div
            style={isEditState ? { opacity: 0.1 } : null}
            className="video-iframe thumbnail-frame"
            src={videoObject.link}
          >
            <div className="thumbnail">
              {/* <img src="https://picsum.photos/200/300" alt="mock" /> */}
              <img src={DefaultLessonImage} />
            </div>
            <div className="play" onClick={() => showModal(videoObject)}>
              <IconSVG name="play"></IconSVG>
            </div>
          </div>
          {!isEditState && (
            <>
              {isEditPage && (
                <div className="video-card__menu">
                  {/* <div className="video-card__menu-item">
                    <IconSVG name="list"></IconSVG>
                  </div> */}
                  <div
                    className="video-card__menu-item"
                    onClick={() => this.startEdit()}
                  >
                    {isEditable && <IconSVG name="edit"></IconSVG>}
                  </div>
                </div>
              )}
              <div className="add-resources__menu">
                <div className="add-resources__menu-link resources-link">
                  <ul>
                    {links.map((link, index) => {
                      return (
                        <li
                          onClick={() => {
                            navigator.clipboard.writeText(link.url);
                            this.openWin(link.url);
                          }}
                        >
                          {links.length > 0 && link.name && (
                            <span>{link.name}</span>
                          )}
                          <IconSVG name="link"></IconSVG>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </>
          )}
          <div
            className={`spacing-container-video ${
              isEditState ? "visible" : "notvisible"
            }`}
          >
            <div className="video-card-title">{videoObject.title}</div>
            <div className="video-card-sub-name">{videoObject.lesson_name}</div>
            <div className="video-card-content">{videoObject.description}</div>
          </div>
          {/* Last button */}
          {!isEditState && videoObject && answers && (
            <div className="btn-video-wrapper">
              <div className="btn-video" className="btn-video">
                <div className="btn-video-number">
                  <span className="btn-video-number__rate">
                    {questions_answered} / {questions_count}
                  </span>
                  <span className="btn-video-number__percent">
                    {((current_mark / total_marks) * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="video-card-btn-wrapper">
                  <Button
                    variant="outline-primary"
                    className="video-card-btn btn-video__button"
                    onClick={() => {
                      if (current_mark == total_marks) {
                        this.toggleAnswer(true);
                      } else {
                        this.toggleTest(true);
                      }
                    }}
                  >
                    {current_mark == total_marks ? "Revise" : "Try Again"}
                  </Button>
                </div>
                <AnswerQuestion
                  answers={answers}
                  handleClose={() => {
                    this.toggleAnswer(false);
                  }}
                  isOpen={isToggleAnswer}
                  toggleAnswer={this.toggleAnswer}
                ></AnswerQuestion>
              </div>
            </div>
          )}
          {/* Last button, where the lession is finished */}
          {!isEditState && videoObject && !answers && (
            <>
              <Button
                variant="outline-primary"
                className="video-card-btn btn-video-wrapper"
                onClick={() => {
                  this.toggleTest(true);
                }}
              >
                Test
              </Button>
            </>
          )}
          <TestQuestion
            handleClose={() => {
              this.toggleTest(false);
            }}
            isOpen={isToggleTest}
            title={`${topic.title}: ${videoObject.title}`}
            questions={videoObject.questions}
            handleSaveAnswers={this.handleSaveAnswers}
          ></TestQuestion>

          {/* EDIT VIDEO LAYER */}
          {isEditState && (
            <div className="edit-video overlay-layer">
              <Form className="video-edit-form">
                <div className="video-card__menu">
                  <div
                    className="video-card__menu-item"
                    onClick={this.handleDeleteLesson}
                  >
                    <IconSVG name="trash"></IconSVG>
                  </div>
                  <div
                    className="video-card__menu-item"
                    onClick={() => this.saveEdit()}
                  >
                    <IconSVG name="save-circle"></IconSVG>{" "}
                  </div>
                </div>
                <div className="add-resources__menu">
                  <div
                    className="add-resources__menu-item"
                    onClick={this.startAddResources}
                  >
                    Add Links<IconSVG name="link"></IconSVG>
                  </div>
                </div>
                <div className="upload-video-wrapper">
                  <div className="upload-btn-wrapper">
                    <div className="background">
                      <Button
                        variant="outline-primary"
                        className="upload-btn"
                        onClick={this.startUploadVideo}
                      >
                        Upload or Link Video
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="editable-content-wrapper">
                  <div className="video-card-title">{topic.title}</div>
                  <div className="video-edit-text">
                    <div className="video-edit-text__body">
                      <Form.Group>
                        <Form.Control
                          type="text"
                          className="video-edit-text__input video-edit-text__title video-edit-text__border"
                          value={this.state.lesson_name}
                          onChange={(newValue) => {
                            this.setState({
                              lesson_name: newValue.target.value,
                            });
                          }}
                        />
                      </Form.Group>
                      <hr></hr>
                      <Form.Group>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          className="video-edit-text__input"
                          value={this.state.lesson_description}
                          onChange={(newValue) => {
                            this.setState({
                              lesson_description: newValue.target.value,
                            });
                          }}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="video-edit-button">
                    <Button
                      variant="outline-primary"
                      className="video-card-btn edit-test-button"
                      onClick={() => {
                        this.toggleEditQuestion(true);
                      }}
                    >
                      Add Questions
                    </Button>
                    <TestCreation
                      handleClose={() => {
                        this.toggleEditQuestion(false);
                      }}
                      show={isToggleEditQuestion}
                      handleSaveQuestions={this.handleSaveQuestions}
                      title={`${topic.title}: ${videoObject.title}`}
                      course_id={course_id}
                      topic_id={topic.id}
                      lesson_id={videoObject.id}
                    ></TestCreation>
                  </div>
                </div>
              </Form>
            </div>
          )}

          {/* EDIT VIDEO LAYER */}
          {isAddResourcesState && (
            <div className="add-resources-wrapper">
              <div className="content-wrapper">
                <div className="content-wrapper__body">
                  <div className="group-link">
                    <div className="group-link__link-wrapper">
                      <ul
                        onDragOver={(e) => {
                          this.dragOver(e);
                        }}
                      >
                        <li className="topElem"></li>
                        {links.map((link, index) => {
                          return (
                            <li
                              data-id={index}
                              draggable
                              onDragEnd={this.dragEnd}
                              onDragStart={(e) => {
                                this.dragStart(e);
                              }}
                            >
                              <LinkCustom
                                key={index}
                                index={index + 1}
                                deleteLink={() => {
                                  this.deleteLink(index);
                                }}
                                onChangeData={this.onChangeData}
                                dataObj={link}
                              ></LinkCustom>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="group-button">
                    <Button
                      variant="outline-primary group-button"
                      className="video-card-btn"
                      onClick={this.appendLink}
                    >
                      +
                    </Button>
                    <Button
                      variant="outline-primary group-button"
                      className=""
                      onClick={() => this.saveResources()}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Upload Video Layer */}
          {isUploadVideo && (
            <div className="upload-video">
              <div className="upload-video-wrapper">
                <div className="upload-video-wrapper__body">
                  <div className="group-upload-link">
                    <div>
                      <div className="video-link">
                        <span className="video-link__title">Link Video</span>
                        <div
                          className="video-link__delete"
                          onClick={() => {
                            this.removeVideoLink();
                          }}
                        >
                          <IconSVG name="trash"></IconSVG>
                        </div>
                      </div>
                      <Form.Group>
                        <Form.Control
                          ref={this.youtubeLinkRef}
                          type="text"
                          className="link-text"
                          onChange={(e) => {
                            this.onChangeVideoLink(e);
                          }}
                          placeholder="Paste Youtube URL"
                        />
                      </Form.Group>
                      <p className="line-separate">
                        <span>or</span>
                      </p>
                      <div className="video-link mt-3">
                        <span className="video-link__title">Upload Video</span>
                        <div
                          className="video-link__delete"
                          onClick={() => {
                            this.removeUploadedVideo();
                          }}
                        >
                          <IconSVG name="trash"></IconSVG>
                        </div>
                      </div>
                      <Dropzone onDrop={this.onDrop} accept="video/*">
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps()} className="drap-video mt-3">
                            <input {...getInputProps()} />
                            <div className="drap-video__icon">
                              {this.state.filePath == "" && (
                                <IconSVG name="upload"></IconSVG>
                              )}
                              {this.state.filePath !== "" && (
                                <div>{this.state.filePath}</div>
                              )}
                            </div>
                          </div>
                        )}
                      </Dropzone>
                    </div>
                  </div>
                  <div className="group-upload-button">
                    <Button
                      variant="outline-primary group-upload-button"
                      className=""
                      onClick={this.saveUploadVideo}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
