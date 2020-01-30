import { useState } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

function Me({initialCount}) {
  const [count, setCount] = useState(0);
  return (
    <View>
      Count: {count}
      <Button onClick={() => setCount(initialCount)}>Reset</Button>
      <Button onClick={() => setCount(prevCount => prevCount + 1)}>+</Button>
      <Button onClick={() => setCount(prevCount => prevCount - 1)}>-</Button>
    </View>
  );
}

export default Me
