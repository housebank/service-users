import {test, request, expect} from "@playwright/test";
import createRandomUser from '../user-test-data';
import { IUserServiceDefault } from '../types';

// @ts-ignore
let apiContext: object;
const serviceName = "user";
let userID:number;
const newUser:IUserServiceDefault = createRandomUser("customer");

test.beforeAll(async ()=>{
  apiContext = await request.newContext({
    baseURL: "http://localhost:8004/",
    extraHTTPHeaders:{
      authorization: ""
    }
  });
});

test.describe(`${serviceName}-service tests`,()=>{
  const newUsersArray: IUserServiceDefault[] = [];
  newUsersArray.push(newUser);

  test("Health check: DB health", async ()=>{
    const getHealth = await apiContext.get("v1/health");
    const responseBody = await getHealth.json();
    const responseStatus = await getHealth.status();
    expect(responseStatus===200).toBeTruthy();
    expect(responseBody.connections.database === "ok").toBeTruthy();
  });

  test("POST: Create one or more endpoint", async()=>{
    const createOneUser = await apiContext.post("v1/user",{
      data:newUsersArray
    });
    const responseBody = await createOneUser.json();
    const responseStatus = await createOneUser.status();
    userID = responseBody.data[0].id;
    expect(responseStatus===201).toBeTruthy();
    expect(responseBody.data).toBeTruthy();
  });

  test("GET: Get all endpoint", async ()=>{
    const getAllUsers = await apiContext.get("v1/user");
    const responseBody = await getAllUsers.json();
    const responseStatus = await getAllUsers.status();
    expect(responseStatus===200).toBeTruthy();
    expect(Array.isArray(responseBody.data)).toBeTruthy();
  });

  test("GET: Get one endpoint", async()=>{
    const getOneUser = await apiContext.get("v1/user/" + userID);
    const responseBody = await getOneUser.json();
    const responseStatus = await getOneUser.status();
    expect(responseStatus===200).toBeTruthy();
    expect(responseBody.data).toBeTruthy();
  });

  test("PATCH: Edit one endpoint", async ()=>{
    const editUser = await apiContext.patch("v1/user/" + userID, {data: {
        verified: true
      }});
    const responseBody = await editUser.json();
    const responseStatus = await editUser.status();
    expect(responseStatus===200).toBeTruthy();
    expect(responseBody.data).toBeTruthy();
  });

  test("DELETE: Delete one endpoint", async()=>{
    const deleteUser = await apiContext.delete("v1/user/" + userID);
    const responseBody = await deleteUser.json();
    const responseStatus = await deleteUser.status();
    expect(responseStatus===200).toBeTruthy();
    expect(responseBody.data).toBeTruthy();
  });
});
// eslint-disable-next-line no-empty-pattern
test.afterAll(async ({}) => {
  // @ts-ignore
  await apiContext.dispose();
});