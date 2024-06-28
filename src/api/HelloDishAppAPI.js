
const baseURL = "https://api.hellodish.in/";

export async function GetList_Data(url) {

    let data = null;
    try {
        // Send request
        const getListOption = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("authToken")}`, // notice the Bearer before your token
            },
            redirect: "follow"
        }
        data = await fetch(baseURL + url, getListOption)
        let GetListResponse = await data.json()
        return {
            isOk: true,
            data: GetListResponse,
            statusCode: data.status
        };

    }
    catch {
        return {
            isOk: false,
            message: "Failed To Load Data",
            statusCode: data.status
        };
    }
}

export async function Delete_Data(url) {

    let data = null;
    try {
        // Send request
        const getListOption = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("authToken")}`, // notice the Bearer before your token
            }
        }
        data = await fetch(baseURL + url, getListOption)

        if (data.status === 200) {
            return {
                isOk: true,
                data: data,
                statusCode: data.status
            };
        } else {

            return {
                isOk: false,
                data: await data.text(),
                statusCode: data.status,
            };
        }
    }
    catch {
        return {
            isOk: false,
            message: "Failed To Load Data",
            statusCode: data.status
        };
    }
}

export async function Activate_Agent(url, dataObj) {

    let data = null;
    try {
        // Send request
        const getListOption = {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("authToken")}`, // notice the Bearer before your token
            }
            ,
            body: JSON.stringify(dataObj)
        }
        data = await fetch(baseURL + url, getListOption)
        if (!data.ok) {
            return {
                isOk: data.ok,
                data: await data.text(),
                statusCode: data.status
            };
        } else {
            return {
                isOk: data.ok,
                data: await data.json(),
                stautsCode: data.status
            };
        }
    }

    catch (err) {
        return {
            isOk: false,
            message: "Failed To activate agent  " + JSON.stringify(err),
            statusCode: data.status
        };
    }
}

export async function UpdateStatusApproveAndReject(url) {

    let data = null;
    try {
        // Send request
        const getListOption = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("authToken")}`, // notice the Bearer before your token
            }
        }
        data = await fetch(baseURL + url, getListOption)
        if (!data.ok) {
            return {
                isOk: data.ok,
                data: await data.json(),
                statusCode: data.status
            };
        } else {
            return {
                isOk: data.ok,
                data: await data.json(),
                stautsCode: data.status
            };
        }

    }

    catch (err) {
        return {
            isOk: false,
            message: "Failed To Deactivate agent " + JSON.stringify(err),
            statusCode: data.status
        };
    }
}

export async function Insert_Data(url, dataObj) {

    let data = null;
    try {
        // Send request
        const getListOption = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("authToken")}`, // notice the Bearer before your token
            }
            ,
            body: JSON.stringify(dataObj)
        }

        data = await fetch(baseURL + url, getListOption)

        if (!data.ok) {
            return {
                isOk: data.ok,
                data: await data.text(),
                statusCode: data.status
            };
        } else {
            return {
                isOk: data.ok,
                data: await data.json(),
                stautsCode: data.status
            };
        }
    }
    catch (err) {
        return {
            isOk: false,
            message: "Failed To Insert Data : " + JSON.stringify(err),
            statusCode: data.status
        };
    }
}

export async function Update_Data(url, dataObj) {

    let data = null;
    try {
        // Send request
        const getListOption = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("authToken")}`, // notice the Bearer before your token
            }
            ,
            body: JSON.stringify(dataObj)
        }
        data = await fetch(baseURL + url, getListOption)
        if (!data.ok) {
            return {
                isOk: data.ok,
                data: await data.text(),
                statusCode: data.status
            };
        } else {
            return {
                isOk: data.ok,
                data: await data.json(),
                stautsCode: data.status
            };
        }

    }

    catch (err) {
        return {
            isOk: false,
            message: "Failed To Update Data : " + JSON.stringify(err),
            statusCode: data.status
        };
    }
}
export async function Update_FormData(url, dataObj) {

    let data = null;
    try {
        // Send request
        const getListOption = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("authToken")}`, // notice the Bearer before your token
            }
            ,
            body: dataObj
        }
        data = await fetch(baseURL + url, getListOption)
        if (!data.ok) {
            return {
                isOk: data.ok,
                data: await data.text(),
                statusCode: data.status
            };
        } else {
            return {
                isOk: data.ok,
                data: await data.json(),
                stautsCode: data.status
            };
        }

    }

    catch (err) {
        return {
            isOk: false,
            message: "Failed To Update Data : " + JSON.stringify(err),
            statusCode: data.status
        };
    }
}