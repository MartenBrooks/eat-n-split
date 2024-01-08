import { useState } from 'react';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [formAddFriendToggle, setFormAddFriendToggle] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState(0);

  const currFriend = friends.filter(
    (friend) => friend.id === selectedFriendId
  )[0];
  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendsList
          friends={friends}
          selectFriend={setSelectedFriendId}
          selectedFriendId={selectedFriendId}
        />
        <FormAddFriend open={formAddFriendToggle} onSubmit={setFriends} />
        <Button onClick={() => setFormAddFriendToggle(!formAddFriendToggle)}>
          {formAddFriendToggle ? 'Close' : 'Add friend'}
        </Button>
      </div>
      {currFriend && <FormSplitBill friend={currFriend} />}
    </div>
  );
}

function FriendsList({ friends, selectFriend, selectedFriendId }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectFriend={selectFriend}
          selectedFriendId={selectedFriendId}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, selectFriend, selectedFriendId }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className='green'>
          {friend.name} owes you ${friend.balance}
        </p>
      )}
      {friend.balance < 0 && (
        <p className='red'>
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      {selectedFriendId === friend.id ? (
        <Button onClick={() => selectFriend(0)}>Close</Button>
      ) : (
        <Button onClick={() => selectFriend(friend.id)}>Select</Button>
      )}
    </li>
  );
}
function FormAddFriend({ open }) {
  return (
    open && (
      <form className='form-add-friend'>
        <label>🧑‍🤝‍🧑 Friend name</label>
        <input type='text' />

        <label>🖼️ Image URL</label>
        <input type='text' />
        <Button>Add</Button>
      </form>
    )
  );
}
function FormSplitBill({ friend }) {
  return (
    <form className='form-split-bill'>
      <label>💰 Bill value:</label>
      <input type='text' />
      <label>🧍 Your expence:</label>
      <input type='text' />
      <label>🧑‍🤝‍🧑 {friend.name}'s expense:</label>
      <input type='text' />
      <label>🤑 Who is paying the bill?</label>
      <input type='text' />
      <Button>Split bill</Button>
    </form>
  );
}
function Button({ children, onClick }) {
  return (
    <button className='button' onClick={onClick}>
      {children}
    </button>
  );
}
