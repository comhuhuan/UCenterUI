export default {
    userData: {
        IDNumber: '',
        userType: '',
        name: '',
        kindId: '',
        IDtype: '',
        IDCode: '',
        addr: '',
        officerId: '',
        postalCode: '',
        registerTime: '',
        remark: '',
    },
    serverData: {
        userId: '',
        serviceContent: '',
        regType: '',
        regId: '',
        setMode: '',
        busType: '',
        domain: [{
            value: '',
        }]
    },
    roomData: {
        userId: '',
        serviceId: '',
        houseCode: '',
        houseArea: '',
        cabinetId: '',
        virtualName: '',
        virtualStatus: '',
        virtualType: '',
        virtualNetAddr: '',
        virtualPhyAddr: '',
        bandwidth: '',
        serviceIp: '',
        serviceDesc: '',
        serviceStartDate: '',
        serviceEndDate: '',
        dateRange: [],
    },
    userRead: false, //用户只读
    serverRead: false, //服务只读
    userInputRead: false, //用户input框只读
    serverInputShow: false, //服务input是否显示
    isAdd: false, //新增
    isEdit: false, //修改
    activeId: 0, //记录当前选中
    isUser: false, //当前用户
    isServer: false, //当前服务
    isRoom: false, //当前机房
    step: 1,
    serverEdit: true, //服务右侧列表是否显示
}