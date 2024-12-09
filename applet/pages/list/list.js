Page({
  data: {
    historyList: [],  // 存储历史记录的数组
  },

  // 页面加载时获取历史记录
  onLoad: function () {
    this.loadHistoryRecords();
  },

  // 加载历史记录
  loadHistoryRecords() {
    // 假设历史记录存储在本地存储中
    const history = wx.getStorageSync("historyList") || [];
    this.setData({ historyList: history });
  },

  // 点击某一记录查看详情
  viewRecordDetails(event) {
    const recordIndex = event.currentTarget.dataset.index;
    const record = this.data.historyList[recordIndex];

    // 假设跳转到记录详情页面
    wx.navigateTo({
      url: `/pages/recordDetail/recordDetail?title=${record.title}&desc=${record.description}`,
    });
  },
});
