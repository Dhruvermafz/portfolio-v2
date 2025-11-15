import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "../../api/projectApi";
import {
  Form,
  Input,
  Button,
  Upload,
  Card,
  Row,
  Col,
  Typography,
  message,
  Space,
  Collapse,
  Divider,
  Affix,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "./createproject.css";

const { Title } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;

const ProjectForm = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const isEditMode = !!_id;

  const [form] = Form.useForm();
  const [mainImageFile, setMainImageFile] = useState(null);
  const [imagesFileList, setImagesFileList] = useState([]);
  const [challenges, setChallenges] = useState([
    { title: "", challenge: "", solution: "" },
  ]);

  // Fetch project
  const {
    data: project,
    isLoading,
    isError,
  } = useGetProjectByIdQuery(_id, {
    skip: !isEditMode,
  });

  // Populate form
  useEffect(() => {
    window.scrollTo(0, 0);
    if (isEditMode && project) {
      form.setFieldsValue({
        ...project,
        tags: project.tags?.join(", ") || "",
      });
      setChallenges(
        project.challenges?.length
          ? project.challenges
          : [{ title: "", challenge: "", solution: "" }]
      );
      setMainImageFile(null);
      setImagesFileList([]);
    }
  }, [isEditMode, project, form]);

  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const handleAddChallenge = () => {
    setChallenges((prev) => [
      ...prev,
      { title: "", challenge: "", solution: "" },
    ]);
  };

  const handleChallengeChange = (index, field, value) => {
    setChallenges((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
  };

  const handleMainImageChange = ({ file }) => {
    setMainImageFile(file.originFileObj);
  };

  const handleImagesChange = ({ fileList }) => {
    setImagesFileList(fileList.map((f) => f.originFileObj));
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();

    // Basic fields
    [
      "id",
      "title",
      "client",
      "website",
      "ghLink",
      "overview",
      "services",
      "results",
    ].forEach((key) => formData.append(key, values[key] || ""));

    // Tags
    const tags = (values.tags || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    tags.forEach((tag, i) => formData.append(`tags[${i}]`, tag));

    // Challenges
    challenges.forEach((ch, i) => {
      formData.append(`challenges[${i}][title]`, ch.title);
      formData.append(`challenges[${i}][challenge]`, ch.challenge);
      formData.append(`challenges[${i}][solution]`, ch.solution);
    });

    // Files
    if (mainImageFile) formData.append("mainImage", mainImageFile);
    imagesFileList.forEach((img, i) => formData.append(`images[${i}]`, img));

    try {
      if (isEditMode) {
        await updateProject({ id: _id, ...formData }).unwrap();
        message.success("Project updated!");
      } else {
        await createProject(formData).unwrap();
        message.success("Project created!");
      }
      navigate("/projects");
    } catch (err) {
      message.error(`Failed: ${err?.data?.message || err.message}`);
    }
  };

  if (isEditMode && isLoading) return <div className="loading">Loading...</div>;
  if (isEditMode && isError)
    return <div className="error">Failed to load project</div>;

  return (
    <div className="project-form-container">
      <Card className="form-card">
        <Row justify="space-between" align="middle" className="form-header">
          <Title level={3} className="form-title">
            {isEditMode ? "Edit Project" : "Create Project"}
          </Title>
        </Row>

        <Divider className="form-divider" />

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* ==== BASIC INFO ==== */}
          <Card title="Basic Info" className="section-card" size="small">
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="json-key">id</span>}
                  name="id"
                  rules={[{ required: true, message: "Slug required" }]}
                >
                  <Input
                    disabled={isEditMode}
                    className="json-value"
                    placeholder="my-project"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="json-key">title</span>}
                  name="title"
                  rules={[{ required: true }]}
                >
                  <Input className="json-value" placeholder="Project Title" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="json-key">client</span>}
                  name="client"
                >
                  <Input className="json-value" placeholder="Client Name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="json-key">services</span>}
                  name="services"
                >
                  <Input
                    className="json-value"
                    placeholder="Web, Mobile, SEO..."
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* ==== LINKS ==== */}
          <Card title="Links" className="section-card" size="small">
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="json-key">website</span>}
                  name="website"
                >
                  <Input
                    className="json-value"
                    placeholder="https://example.com"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="json-key">ghLink</span>}
                  name="ghLink"
                >
                  <Input
                    className="json-value"
                    placeholder="https://github.com/..."
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* ==== OVERVIEW & RESULTS ==== */}
          <Card title="Content" className="section-card" size="small">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label={<span className="json-key">overview</span>}
                  name="overview"
                >
                  <TextArea
                    rows={3}
                    className="json-value"
                    placeholder="Project overview..."
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={<span className="json-key">results</span>}
                  name="results"
                >
                  <TextArea
                    rows={3}
                    className="json-value"
                    placeholder="Results & impact..."
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* ==== MEDIA ==== */}
          <Card title="Media" className="section-card" size="small">
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label={<span className="json-key">mainImage</span>}>
                  <Upload
                    accept="image/*"
                    maxCount={1}
                    beforeUpload={() => false}
                    onChange={handleMainImageChange}
                    listType="picture-card"
                    showUploadList={{ showRemoveIcon: true }}
                  >
                    {mainImageFile ? null : (
                      <div>
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>Main Image</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label={<span className="json-key">images</span>}>
                  <Upload
                    accept="image/*"
                    multiple
                    beforeUpload={() => false}
                    onChange={handleImagesChange}
                    listType="picture-card"
                    showUploadList={{ showRemoveIcon: true }}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Add Images</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* ==== CHALLENGES (Collapsible) ==== */}
          <Card title="Challenges" className="section-card" size="small">
            <Collapse
              defaultActiveKey={
                challenges.some((c) => c.title || c.challenge) ? "1" : []
              }
            >
              <Panel header={`Challenges (${challenges.length})`} key="1">
                {challenges.map((item, idx) => (
                  <Card
                    key={idx}
                    size="small"
                    className="challenge-card"
                    style={{ marginBottom: 12 }}
                  >
                    <Row gutter={12}>
                      <Col xs={24} sm={8}>
                        <Input
                          placeholder="Title"
                          value={item.title}
                          onChange={(e) =>
                            handleChallengeChange(idx, "title", e.target.value)
                          }
                          className="json-value"
                        />
                      </Col>
                      <Col xs={24} sm={8}>
                        <TextArea
                          placeholder="Challenge"
                          value={item.challenge}
                          rows={2}
                          onChange={(e) =>
                            handleChallengeChange(
                              idx,
                              "challenge",
                              e.target.value
                            )
                          }
                          className="json-value"
                        />
                      </Col>
                      <Col xs={24} sm={8}>
                        <TextArea
                          placeholder="Solution"
                          value={item.solution}
                          rows={2}
                          onChange={(e) =>
                            handleChallengeChange(
                              idx,
                              "solution",
                              e.target.value
                            )
                          }
                          className="json-value"
                        />
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Button
                  type="dashed"
                  block
                  icon={<PlusOutlined />}
                  onClick={handleAddChallenge}
                >
                  Add Challenge
                </Button>
              </Panel>
            </Collapse>
          </Card>

          {/* ==== TAGS ==== */}
          <Card title="Tags" className="section-card" size="small">
            <Form.Item
              label={<span className="json-key">tags</span>}
              name="tags"
            >
              <Input
                className="json-value"
                placeholder="react, nodejs, ui..."
              />
            </Form.Item>
          </Card>

          {/* ==== STICKY FOOTER ==== */}
          <Affix offsetBottom={0}>
            <Card className="footer-card">
              <Space style={{ width: "100%", justifyContent: "space-between" }}>
                <Space>
                  <Button
                    onClick={() => navigate("/projects")}
                    icon={<CloseOutlined />}
                  >
                    Discard
                  </Button>
                  <Button type="dashed" icon={<SaveOutlined />}>
                    Save Draft
                  </Button>
                </Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isCreating || isUpdating}
                  icon={<PlusOutlined />}
                >
                  {isEditMode ? "Update" : "Publish"} Project
                </Button>
              </Space>
            </Card>
          </Affix>
        </Form>
      </Card>
    </div>
  );
};

export default ProjectForm;
