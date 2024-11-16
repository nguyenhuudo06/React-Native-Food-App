import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';

const Order = () => {
  const [start, setStart] = useState<number>(0);
  const [orders, setOrders] = useState([start]); // Mảng dữ liệu giả lập các đơn hàng
  const [loading, setLoading] = useState(false); // Kiểm tra trạng thái loading

  // Hàm thêm dữ liệu giả lập
  const loadMoreOrders = () => {
    if (loading) return;

    setLoading(true);
    setTimeout(() => {
      setOrders((prevOrders) => [
        ...prevOrders,
        start + 1, // Tạo thêm 5 bản ghi mới
      ]);
      setStart(prev => prev + 1)
      setLoading(false);
    }, 1000); // Giả lập việc tải thêm dữ liệu
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
      style={{ backgroundColor: "red" }}
        data={orders}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderRadius: 5 }}>
            <Text>Đơn hàng {item}</Text>
          </View>
        )}
        // keyExtractor={(item) => item.toString()}
        onEndReached={loadMoreOrders} // Gọi hàm khi cuộn đến cuối
        onEndReachedThreshold={0.1} // Khi cuộn đến 50% cuối danh sách
        ListFooterComponent={
          loading ? <Text>Loading...</Text> : null // Hiển thị loading khi đang tải thêm
        }
      />
    </View>
  );
};

export default Order;
