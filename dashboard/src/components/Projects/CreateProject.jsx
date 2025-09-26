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
  Divider,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import "./createproject.css";

const { Title } = Typography;
const { TextArea } = Input;

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

  // Fetch project data if in edit mode
  const {
    data: project,
    isLoading,
    isError,
  } = useGetProjectByIdQuery(_id, { skip: !isEditMode });

  // Populate form data when project is fetched
  useEffect(() => {
    window.scrollTo(0, 0);
    if (isEditMode && project) {
      form.setFieldsValue({
        ...project,
        tags: project.tags ? project.tags.join(", ") : "",
      });
      setChallenges(
        project.challenges || [{ title: "", challenge: "", solution: "" }]
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
    setImagesFileList(fileList.map((file) => file.originFileObj));
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    // basic fields
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

    // tags
    const tagsArray = (values.tags || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    tagsArray.forEach((tag, i) => {
      formData.append(`tags[${i}]`, tag);
    });

    // challenges
    challenges.forEach((ch, i) => {
      formData.append(`challenges[${i}][title]`, ch.title);
      formData.append(`challenges[${i}][challenge]`, ch.challenge);
      formData.append(`challenges[${i}][solution]`, ch.solution);
    });

    // mainImage
    if (mainImageFile) {
      formData.append("mainImage", mainImageFile);
    }
    // images
    imagesFileList.forEach((img, i) => {
      formData.append(`images[${i}]`, img);
    });

    try {
      if (isEditMode) {
        await updateProject({ id: _id, ...formData }).unwrap();
        message.success("Project updated successfully!");
      } else {
        await createProject(formData).unwrap();
        message.success("Project added successfully!");
      }
      navigate("/projects");
    } catch (err) {
      message.error(
        `Failed to ${isEditMode ? "update" : "add"} project: ${
          err?.message || ""
        }`
      );
    }
  };

  if (isEditMode && isLoading) {
    return <div>Loading project data...</div>;
  }
  if (isEditMode && isError) {
    return <div>Failed to load project data</div>;
  }

  return (
    <Card
      className="my-5 json-container"
      style={{ maxWidth: 900, margin: "auto" }}
    >
      <Row justify="space-between" align="middle" className="json-header">
        <Col>
          <Title level={3} style={{ margin: 0 }}>
            {isEditMode ? "Update Project" : "Create New Project"}
          </Title>
        </Col>
        <Col>
          <Space>
            <Button onClick={() => navigate("/projects")}>Discard</Button>
            <Button type="dashed">Save Draft</Button>
            <Button
              type="primary"
              htmlType="submit"
              form="project-form"
              loading={isCreating || isUpdating}
            >
              {isEditMode ? "Update Project" : "Publish Project"}
            </Button>
          </Space>
        </Col>
      </Row>

      <Divider />

      <Form
        id="project-form"
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          id: "",
          title: "",
          client: "",
          website: "",
          ghLink: "",
          overview: "",
          services: "",
          results: "",
          tags: "",
        }}
      >
        {/* id (slug) */}
        <Form.Item
          label={<span className="json-key">id</span>}
          name="id"
          rules={[{ required: true, message: "Project ID (slug) is required" }]}
        >
          <Input
            className="json-value"
            placeholder="Enter project slug (e.g., itsablog)"
            disabled={isEditMode}
          />
        </Form.Item>

        {/* title */}
        <Form.Item
          label={<span className="json-key">title</span>}
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input className="json-value" placeholder="Enter project title" />
        </Form.Item>

        {/* client */}
        <Form.Item
          label={<span className="json-key">client</span>}
          name="client"
        >
          <Input className="json-value" placeholder="Enter client name" />
        </Form.Item>

        {/* website */}
        <Form.Item
          label={<span className="json-key">website</span>}
          name="website"
        >
          <Input className="json-value" placeholder="Enter website URL" />
        </Form.Item>

        {/* ghLink */}
        <Form.Item
          label={<span className="json-key">ghLink</span>}
          name="ghLink"
        >
          <Input className="json-value" placeholder="Enter GitHub URL" />
        </Form.Item>

        {/* overview */}
        <Form.Item
          label={<span className="json-key">overview</span>}
          name="overview"
        >
          <TextArea
            className="json-value"
            placeholder="Enter project overview"
            rows={3}
          />
        </Form.Item>

        {/* services */}
        <Form.Item
          label={<span className="json-key">services</span>}
          name="services"
        >
          <Input
            className="json-value"
            placeholder="Enter services (comma-separated)"
          />
        </Form.Item>

        {/* mainImage */}
        <Form.Item label={<span className="json-key">mainImage</span>}>
          <Upload
            accept="image/*"
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleMainImageChange}
            showUploadList={{ showRemoveIcon: true }}
          >
            <Button icon={<UploadOutlined />}>Upload Main Image</Button>
          </Upload>
        </Form.Item>

        {/* images */}
        <Form.Item label={<span className="json-key">images</span>}>
          <Upload
            accept="image/*"
            multiple
            beforeUpload={() => false}
            onChange={handleImagesChange}
            showUploadList={{ showRemoveIcon: true }}
          >
            <Button icon={<UploadOutlined />}>Upload Additional Images</Button>
          </Upload>
        </Form.Item>

        {/* challenges */}
        <Form.Item label={<span className="json-key">challenges</span>}>
          <div className="json-array">
            <div className="json-brace">[</div>
            {challenges.map((item, index) => (
              <Card
                key={index}
                size="small"
                type="inner"
                style={{ marginBottom: 8, background: "#f8f9fa" }}
                className="json-nested"
              >
                <Row gutter={12}>
                  <Col xs={24} md={8}>
                    <Input
                      value={item.title}
                      placeholder="Challenge title"
                      className="json-value"
                      onChange={(e) =>
                        handleChallengeChange(index, "title", e.target.value)
                      }
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <TextArea
                      value={item.challenge}
                      placeholder="Challenge description"
                      className="json-value"
                      rows={2}
                      onChange={(e) =>
                        handleChallengeChange(
                          index,
                          "challenge",
                          e.target.value
                        )
                      }
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <TextArea
                      value={item.solution}
                      placeholder="Solution description"
                      className="json-value"
                      rows={2}
                      onChange={(e) =>
                        handleChallengeChange(index, "solution", e.target.value)
                      }
                    />
                  </Col>
                </Row>
              </Card>
            ))}
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={handleAddChallenge}
              style={{ width: "100%" }}
            >
              Add Challenge
            </Button>
            <div className="json-brace">]</div>
          </div>
        </Form.Item>

        {/* results */}
        <Form.Item
          label={<span className="json-key">results</span>}
          name="results"
        >
          <TextArea
            className="json-value"
            placeholder="Enter project results"
            rows={3}
          />
        </Form.Item>

        {/* tags */}
        <Form.Item label={<span className="json-key">tags</span>} name="tags">
          <Input
            className="json-value"
            placeholder="Enter tags (comma-separated)"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isCreating || isUpdating}
            style={{ width: "100%", marginTop: 16 }}
          >
            {isEditMode ? "Update Project" : "Submit Project"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProjectForm;
