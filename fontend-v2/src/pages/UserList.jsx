import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  message,
  Drawer,
  Form,
  Switch,
  Select,
  Spin,
  DatePicker,
  theme,
  FloatButton,
  Tag,
  Popconfirm,
} from "antd";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import axiosInstance from "../utils/axiosInstance";
import debounce from "lodash.debounce";
import dayjs from "dayjs";
import AddUserDrawer from "../components/AddUserDrawer";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const searchInput = useRef(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [revokedPermissions, setRevokedPermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [searchFilter, setSearchFilter] = useState({});
  const [visibleColumnKeys, setVisibleColumnKeys] = useState([
    "id",
    "username",
    "firstName",
    "lastName",
    "email",
    "phone",
    "gender",
    "birthday",
    "address",
  ]);

  useEffect(() => {
    const visibleColumnKeys = localStorage.getItem(
      "visibleColumnKeysForUserList"
    );
    if (visibleColumnKeys) {
      setVisibleColumnKeys(JSON.parse(visibleColumnKeys));
    } else {
      setVisibleColumnKeys(columns.map((col) => col.key));
    }
  }, []);

  const [sortConfig, setSortConfig] = useState({
    sortBy: "createdAt",
    sortDirection: "asc",
  });
  const [isAddUserDrawerVisible, setIsAddUserDrawerVisible] = useState(false);

  const myUser = JSON.parse(localStorage.getItem("auth"))?.user;

  const fetchRoles = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/roles");
      setRoles(res.data.data);
    } catch (err) {
      message.error("Không thể lấy danh sách quyền");
    }
  }, []);

  const fetchUsers = useCallback(
    debounce(async (page = currentPage - 1, size = pageSize) => {
      setLoadingTable(true);
      try {
        const res = await axiosInstance.post("/users", {
          page,
          size,
          ...sortConfig,
          ...searchFilter,
        });
        const {
          content,
          page: { totalElements, number, size: pageSize },
        } = res.data.data;
        setUsers(content);
        setCurrentPage(number + 1); // Ensure currentPage is updated correctly
        setPagination((prev) => ({
          ...prev,
          current: number + 1,
          pageSize,
          total: totalElements,
        }));
      } catch (err) {
        message.error("Lỗi không thể lấy danh sách người dùng");
      } finally {
        setLoadingTable(false);
      }
    }, 300),
    [pageSize, searchFilter, sortConfig]
  );

  const fetchUserDetail = async (userId) => {
    setLoadingUser(true);
    try {
      const res = await axiosInstance.get(`/users/${userId}`);
      let userData = res.data.data;
      setEditingUser(userData);
    } catch (err) {
      message.error("Không thể lấy chi tiết người dùng");
    } finally {
      setLoadingUser(false);
    }
  };

  const handleUpdateUser = async (userId, values) => {
    setLoadingUser(true);
    try {
      await axiosInstance.put(`/users/${userId}`, values);
      message.success("Cập nhật thành công!");
      setEditingUser(null);
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      message.error("Lỗi không thể cập nhật người dùng");
    } finally {
      setLoadingUser(false);
    }
  };

  const handleUserAdded = () => {
    fetchUsers(); // Refresh the user list after adding a new user
  };

  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, [fetchRoles, fetchUsers]);

  const handleSearchFilterChange = (dataIndex, value) => {
    setSearchFilter((prev) => ({
      ...prev,
      [dataIndex]: value,
    }));
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Tìm theo ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => {
            handleSearchFilterChange(dataIndex, selectedKeys[0]);
            confirm();
          }}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              handleSearchFilterChange(dataIndex, selectedKeys[0]);
              confirm();
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => {
              clearFilters();
              setSelectedKeys([]);
              handleSearchFilterChange(dataIndex, undefined);
              confirm();
            }}
            size="small"
            style={{ width: 90 }}
          >
            Xoá
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text?.toString() || ""}
        />
      ) : (
        text
      ),
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current);
    setSortConfig({
      sortBy: sorter.field,
      sortDirection: sorter.order === "ascend" ? "asc" : "desc",
    });
    fetchUsers(pagination.current - 1, pagination.pageSize);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
      ...getColumnSearchProps("id"),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: true,
      ...getColumnSearchProps("username"),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: true,
      ...getColumnSearchProps("firstName"),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: true,
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: true,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      sorter: true,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        const selectedValue = selectedKeys[0];

        return (
          <div
            style={{ padding: 8, width: 300 }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Select
              placeholder="Chọn giới tính"
              value={selectedValue}
              onChange={(value) => {
                setSelectedKeys(value !== undefined ? [value] : []);
              }}
              style={{ width: "100%", marginBottom: 8 }}
              allowClear
            >
              <Select.Option value={true}>Nam</Select.Option>
              <Select.Option value={false}>Nữ</Select.Option>
            </Select>
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  setSearchFilter((prev) => ({
                    ...prev,
                    gender: selectedValue,
                  }));
                  confirm();
                }}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Tìm
              </Button>
              <Button
                onClick={() => {
                  clearFilters();
                  setSelectedKeys([]);
                  setSearchFilter((prev) => {
                    const updated = { ...prev };
                    delete updated.gender;
                    return updated;
                  });
                  confirm();
                }}
                size="small"
                style={{ width: 90 }}
              >
                Xoá
              </Button>
            </Space>
          </div>
        );
      },
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      render: (gender) => {
        if (gender === true || gender === "male") return "Nam";
        if (gender === false || gender === "female") return "Nữ";
        return "";
      },
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      sorter: true,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        const [from, setFrom] = useState(null);
        const [to, setTo] = useState(null);

        return (
          <div style={{ padding: 8, width: 300 }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <DatePicker
                format="YYYY-MM-DD"
                placeholder="Từ ngày"
                value={from}
                onChange={(date) => setFrom(date)}
              />
              <DatePicker
                format="YYYY-MM-DD"
                placeholder="Đến ngày"
                value={to}
                onChange={(date) => setTo(date)}
              />
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    setSearchFilter((prev) => ({
                      ...prev,
                      ...(from
                        ? { birthdayFrom: from.format("YYYY-MM-DD") }
                        : {}),
                      ...(to ? { birthdayTo: to.format("YYYY-MM-DD") } : {}),
                    }));
                    // setSelectedKeys để filter icon đổi màu
                    setSelectedKeys([from || to]);
                    confirm();
                  }}
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90 }}
                >
                  Tìm
                </Button>
                <Button
                  onClick={() => {
                    clearFilters();
                    setSearchFilter((prev) => {
                      const updated = { ...prev };
                      delete updated.birthdayFrom;
                      delete updated.birthdayTo;
                      return updated;
                    });
                    setFrom(null);
                    setTo(null);
                    setSelectedKeys([]);
                    confirm();
                  }}
                  size="small"
                  style={{ width: 90 }}
                >
                  Xoá
                </Button>
              </Space>
            </Space>
          </div>
        );
      },
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      render: (text) => (text ? dayjs(text).format("YYYY-MM-DD") : ""),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      sorter: true,
      ...getColumnSearchProps("address"),
    },
    {
      title: "roles",
      dataIndex: "roles",
      key: "roles",
      render: (roles) => (
        <span>
          {roles.map((role) => (
            <Tag key={role}>{role} </Tag>
          ))}
        </span>
      ),
    },
    {
      title: "revokedPermissions",
      dataIndex: "revokedPermissions",
      key: "revokedPermissions",
      render: (revokedPermissions) => (
        <span>
          {revokedPermissions.map((permission) => (
            <Tag key={permission}>{permission} </Tag>
          ))}
        </span>
      ),
    },
  ];

  const filteredColumns = columns.filter((col) =>
    visibleColumnKeys.includes(col.key)
  );

  const columnSelector = (
    <Select
      className="mt-5"
      style={{ width: 500, marginBottom: 16, marginTop: 16 }}
      mode="multiple"
      value={visibleColumnKeys}
      onChange={(value) => {
        localStorage.setItem(
          "visibleColumnKeysForUserList",
          JSON.stringify(value)
        );
        setVisibleColumnKeys(value);
      }}
      placeholder="Chọn cột"
    >
      {columns.map((col) => (
        <Select.Option key={col.key} value={col.key}>
          {col.title}
        </Select.Option>
      ))}
    </Select>
  );

  const { token } = theme.useToken();
  return (
    <>
      {myUser.permissions.includes("ADD_USER") && (
        <FloatButton
          icon={<UserAddOutlined />}
          tooltip={<span>Thêm người dùng mới</span>}
          onClick={() => setIsAddUserDrawerVisible(true)}
          style={{ insetInlineEnd: 64 }}
        />
      )}

      <AddUserDrawer
        visible={isAddUserDrawerVisible}
        onClose={() => setIsAddUserDrawerVisible(false)}
        onUserAdded={handleUserAdded}
        roles={roles}
      />

      <Drawer
        title={`Chỉnh sửa người dùng: ${editingUser?.username}`}
        open={!!editingUser}
        onClose={() => {
          setEditingUser(null);
          setSelectedUser(null);
        }}
        width={480}
        destroyOnClose
      >
        {editingUser && (
          <Spin spinning={loadingUser}>
            <Form
              layout="vertical"
              initialValues={editingUser}
              onFinish={(values) => {
                handleUpdateUser(editingUser.id, values);
                setEditingUser(null);
                setSelectedUser(null);
              }}
            >
              <Form.Item
                label="Họ"
                name="firstName"
                rules={[
                  { required: true, message: "Vui lòng nhập họ và tên!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Tên"
                name="lastName"
                rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Vui lòng nhập email!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Ngày sinh"
                name="birthday"
                rules={[
                  { required: true, message: "Vui lòng nhập ngày sinh!" },
                ]}
              >
                <Input type="date" />
              </Form.Item>

              {myUser.roles.includes("ROLE_SUPER_ADMIN") &&
                !editingUser.roles.includes("SUPER_ADMIN") && (
                  <>
                    <Form.Item
                      label="Quyền"
                      name="roles"
                      rules={[
                        { required: true, message: "Vui lòng chọn quyền!" },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        allowClear
                        style={{ width: "100%" }}
                        placeholder="Chọn quyền"
                        options={roles.map((role) => ({
                          label: role.name,
                          value: role.name,
                        }))}
                        onChange={(value) => {
                          setRevokedPermissions([]);
                          roles.forEach((role) => {
                            if (value.includes(role.name)) {
                              setRevokedPermissions((prev) => [
                                ...prev,
                                ...role.permissions,
                              ]);
                              console.log(role.permissions);
                            }
                          });
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Quyền bị thu hồi"
                      name="revokedPermissions"
                    >
                      <Select
                        mode="multiple"
                        allowClear
                        style={{ width: "100%" }}
                        placeholder="Chọn quyền thu hồi"
                        options={revokedPermissions.map((role) => ({
                          label: role.name,
                          value: role.name,
                        }))}
                      />
                    </Form.Item>
                  </>
                )}
              <Form.Item
                label="Giới tính"
                name="gender"
                valuePropName="checked"
                rules={[
                  { required: true, message: "Vui lòng chọn giới tính!" },
                ]}
              >
                <Switch checkedChildren="Nam" unCheckedChildren="Nữ" />
              </Form.Item>

              {myUser.permissions.includes("EDIT_USER") &&
                !(
                  !myUser.roles.includes("ROLE_SUPER_ADMIN") &&
                  editingUser.roles.includes("ADMIN")
                ) &&
                !editingUser.isDeleted && (
                  <Button type="primary" htmlType="submit">
                    Lưu
                  </Button>
                )}

              {myUser.permissions.includes("DELETE_USER") &&
                !(
                  !myUser.roles.includes("ROLE_SUPER_ADMIN") &&
                  editingUser.roles.includes("ADMIN")
                ) &&
                !editingUser.isDeleted &&
                !editingUser.roles.includes("SUPER_ADMIN") && (
                  <Popconfirm
                    title="Xoá người dùng"
                    description="Bạn có chắc chắn muốn xoá người dùng này không?"
                    onConfirm={async () => {
                      try {
                        await axiosInstance.delete(`/users/${editingUser.id}`);
                        message.success("Xoá người dùng thành công!");
                        setEditingUser(null);
                        setSelectedUser(null);
                        fetchUsers();
                      } catch (err) {
                        message.error("Lỗi không thể xoá người dùng");
                      }
                    }}
                    style={{ marginLeft: 8 }}
                  >
                    <Button danger>Xoá</Button>
                  </Popconfirm>
                )}
              {myUser.roles.includes("ROLE_SUPER_ADMIN") &&
                editingUser.isDeleted && (
                  <Button
                    onClick={async () => {
                      try {
                        await axiosInstance.post(
                          `/users/restore/${editingUser.id}`
                        );
                        console.log(editingUser);
                        message.success("Khôi phục người dùng thành công!");
                        setEditingUser(null);
                        setSelectedUser(null);
                        fetchUsers();
                      } catch (err) {
                        message.error("Lỗi không thể khôi phục người dùng");
                      }
                    }}
                  >
                    Khoi phuc tai khoan
                  </Button>
                )}
            </Form>
          </Spin>
        )}
      </Drawer>

      <div style={{ marginBottom: 16 }}>{columnSelector}</div>

      <div className="container mx-auto px-4">
        <Spin spinning={loadingTable}>
          <Table
            columns={filteredColumns}
            rowKey="id"
            dataSource={users}
            pagination={{
              current: currentPage, // Use currentPage state
              pageSize: pagination.pageSize,
              total: pagination.total,
              showSizeChanger: true,
              pageSizeOptions: ["2", "5", "10", "20", "50"],
              onShowSizeChange: (current, size) => {
                setPageSize(size);
                setCurrentPage(1); // Reset to page 1 when page size changes
                fetchUsers(0, size);
              },
              onChange: (page, pageSize) => {
                setCurrentPage(page); // Update currentPage state
                fetchUsers(page - 1, pageSize);
              },
            }}
            onChange={handleTableChange}
            onRow={(record) => ({
              onClick: () => {
                setSelectedUser(record);
                fetchUserDetail(record.id);
              },
              style: {
                background: record.isDeleted
                  ? token.colorErrorBgHover
                  : token.colorBgContainer,
                color: record.isDeleted
                  ? token.colorErrorText
                  : token.colorText,
                cursor: "pointer",
              },
            })}
          />
        </Spin>
      </div>
    </>
  );
};

export default UserTable;
