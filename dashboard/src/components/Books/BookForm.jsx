import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useGetFiltersQuery,
} from "../../api/bookApi";
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Spin,
  Alert,
  message,
} from "antd";

const { Title } = Typography;
const { Option } = Select;

const statusOptions = [
  "unread",
  "not_even_half",
  "mid_half",
  "more_than_half",
  "completed",
];

const shelfStatusOptions = ["idle", "orphaned", "taken"];

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  // Fetch book data for edit mode
  const {
    data: bookData,
    error: bookError,
    isLoading: isBookLoading,
  } = useGetBookByIdQuery(id, { skip: !isEditMode });

  // Fetch languages for dynamic dropdown
  const {
    data: filterData = { languages: [], series: [] },
    isLoading: isFiltersLoading,
  } = useGetFiltersQuery();

  const [createBook] = useCreateBookMutation();
  const [updateBook] = useUpdateBookMutation();

  const [form] = Form.useForm();

  // Extract book from bookData (backend returns { message, book })
  const book = bookData?.book;

  // Populate form in edit mode
  useEffect(() => {
    if (isEditMode && book) {
      form.setFieldsValue({
        title: book.title || "",
        subtitle: book.subtitle || "",
        authors: Array.isArray(book.authors) ? book.authors.join(", ") : "",
        language: book.language || undefined,
        status: book.status || "unread",
        shelf_status: book.shelf_status || "idle",
        is_series: book.is_series || false,
        series_name: book.series_name || "",
        series_part: book.series_part ? String(book.series_part) : "",
        series_total_parts: book.series_total_parts
          ? String(book.series_total_parts)
          : "",
      });
    }
  }, [isEditMode, book, form]);

  const handleFinish = async (values) => {
    try {
      const bookData = {
        ...values,
        authors: values.authors
          .split(",")
          .map((author) => author.trim())
          .filter(Boolean),
        series_part: values.series_part ? Number(values.series_part) : null,
        series_total_parts: values.series_total_parts
          ? Number(values.series_total_parts)
          : null,
        // Only include series fields if is_series is true
        ...(values.is_series
          ? {}
          : { series_name: null, series_part: null, series_total_parts: null }),
      };

      if (!bookData.title || bookData.authors.length === 0) {
        message.error("Title and at least one author are required");
        return;
      }

      if (isEditMode) {
        await updateBook({ id, ...bookData }).unwrap();
        message.success("Book updated successfully");
      } else {
        await createBook(bookData).unwrap();
        message.success("Book created successfully");
      }
      navigate("/bookshelf");
    } catch (err) {
      message.error(
        `Error: ${err?.data?.message || err?.error || "Unknown error"}`
      );
    }
  };

  return (
    <Row justify="center" style={{ marginTop: 32 }}>
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card>
          <Title level={4} style={{ marginBottom: 24 }}>
            {isEditMode ? "Edit Book" : "Add Book"}
          </Title>
          {isBookLoading || isFiltersLoading ? (
            <Spin style={{ display: "block", margin: "24px auto" }} />
          ) : bookError ? (
            <Alert
              type="error"
              message={`Error loading book: ${
                bookError?.data?.message || bookError?.error || "Unknown error"
              }`}
              style={{ marginBottom: 24 }}
            />
          ) : (
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFinish}
              initialValues={{
                title: "",
                subtitle: "",
                authors: "",
                language: undefined,
                status: "unread",
                shelf_status: "idle",
                is_series: false,
                series_name: "",
                series_part: "",
                series_total_parts: "",
              }}
            >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: "Title is required" }]}
                  >
                    <Input placeholder="Enter book title" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Subtitle" name="subtitle">
                    <Input placeholder="Enter subtitle" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Authors (comma-separated)"
                    name="authors"
                    rules={[
                      {
                        required: true,
                        message: "At least one author is required",
                      },
                    ]}
                  >
                    <Input placeholder="e.g. Author1, Author2" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Language" name="language">
                    <Select
                      placeholder="Select Language"
                      allowClear
                      loading={isFiltersLoading}
                    >
                      {filterData.languages.map((lang) => (
                        <Option key={lang} value={lang}>
                          {lang}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item label="Status" name="status">
                    <Select placeholder="Select Status">
                      {statusOptions.map((opt) => (
                        <Option key={opt} value={opt}>
                          {opt}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Shelf Status" name="shelf_status">
                    <Select placeholder="Select Shelf Status">
                      {shelfStatusOptions.map((opt) => (
                        <Option key={opt} value={opt}>
                          {opt}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="is_series"
                valuePropName="checked"
                style={{ marginBottom: 0 }}
              >
                <Checkbox>Is Series</Checkbox>
              </Form.Item>

              <Form.Item
                shouldUpdate={(prev, curr) => prev.is_series !== curr.is_series}
                noStyle
              >
                {({ getFieldValue }) =>
                  getFieldValue("is_series") ? (
                    <Row gutter={16}>
                      <Col xs={24} md={8}>
                        <Form.Item
                          label="Series Name"
                          name="series_name"
                          rules={[
                            {
                              required: true,
                              message:
                                "Series name is required for series books",
                            },
                          ]}
                        >
                          <Input placeholder="Enter series name" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={8}>
                        <Form.Item
                          label="Series Part"
                          name="series_part"
                          rules={[
                            {
                              required: true,
                              message: "Series part is required",
                            },
                          ]}
                        >
                          <Input
                            type="number"
                            min={1}
                            placeholder="Part number"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={8}>
                        <Form.Item
                          label="Total Parts in Series"
                          name="series_total_parts"
                          rules={[
                            {
                              required: true,
                              message: "Total parts is required",
                            },
                          ]}
                        >
                          <Input
                            type="number"
                            min={1}
                            placeholder="Total parts"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  ) : null
                }
              </Form.Item>

              <Row gutter={16} style={{ marginTop: 24 }}>
                <Col>
                  <Button type="primary" htmlType="submit">
                    {isEditMode ? "Update Book" : "Create Book"}
                  </Button>
                </Col>
                <Col>
                  <Button onClick={() => navigate("/books")}>Cancel</Button>
                </Col>
              </Row>
            </Form>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default BookForm;
