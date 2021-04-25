import React, { FC, useEffect, useState } from "react";
import "./App.css";
import {
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import { v4 as uuid } from "uuid";
import Can from "./casl/Can";

const Todo: FC<{
  role: (role: string) => void;
}> = (props) => {
  const [value, setValue] = useState<string>();
  const [todo, setTodo] = useState<{ value: string; id: string }[] | undefined>(
    []
  );
  const [role, setRole] = useState<string>("admin");

  useEffect(() => {
    props.role(role);
  }, [role]);

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              paddingBottom: 20,
            }}
          >
            <Select
              onChange={(value) => {
                // @ts-ignore
                setRole(value.target.value);
              }}
              value={role}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
            >
              <MenuItem value={"admin"}>Admin</MenuItem>
              <MenuItem value={"staff"}>Staff</MenuItem>
            </Select>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <form>
              <TextField
                onChange={(e) => setValue(e.target.value)}
                size="small"
                id="outlined-basic"
                label="Todo"
                variant="outlined"
                value={value}
              />
              <span style={{ padding: 5 }} />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setTodo([
                    // @ts-ignore
                    ...todo,
                    {
                      id: uuid(),
                      value: value,
                    },
                  ]);
                  setValue("");
                }}
              >
                Add
              </Button>
            </form>
          </div>
          <div>
            {todo?.map((value, key) => {
              return (
                <ListItem
                  key={key}
                  dense
                  button
                  style={{ marginTop: 10, marginBottom: 10 }}
                >
                  <ListItemIcon>
                    <Can I="create" a="all">
                      <DeleteOutline
                        onClick={() => {
                          const deleteValue = todo.filter(
                            (todo) => todo.id !== value.id
                          );
                          setTodo(deleteValue);
                        }}
                      />
                    </Can>
                  </ListItemIcon>
                  <ListItemText>{value.value}</ListItemText>
                </ListItem>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;