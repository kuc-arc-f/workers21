import React, { useState, useEffect } from 'react';
import { Todo, CreateTodo, todoSchema } from './todo24/types'; // 上記で定義した型
import axios from 'axios';

const API_BASE_URL = '/api/todo24'; // Cloudflare Workers のエンドポイント

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [formData, setFormData] = useState<CreateTodo>({
    title: '',
    content: '',
    public_type: '公開',
    food_orange: false,
    food_apple: false,
    food_banana: false,
    pub_date1: null,
    pub_date2: null,
    pub_date3: null,
    qty1: null,
    qty2: null,
    qty3: null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get<Todo[]>(API_BASE_URL);
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const openAddDialog = () => {
    setIsEditMode(false);
    setEditingTodo(null);
    setFormData({
      title: '',
      content: '',
      public_type: '公開',
      food_orange: false,
      food_apple: false,
      food_banana: false,
      pub_date1: null,
      pub_date2: null,
      pub_date3: null,
      qty1: null,
      qty2: null,
      qty3: null,
    });
    setErrors({});
    setIsDialogOpen(true);
  };

  const openEditDialog = (todo: Todo) => {
    console.log(todo);
    setIsEditMode(true);
    setEditingTodo(todo);
    setFormData({
      title: todo.title,
      content: todo.content || '',
      public_type: todo.public_type,
      food_orange: todo.food_orange,
      food_apple: todo.food_apple,
      food_banana: todo.food_banana,
      pub_date1: todo.pub_date1 || null,
      pub_date2: todo.pub_date2 || null,
      pub_date3: todo.pub_date3 || null,
      qty1: todo.qty1 || null,
      qty2: todo.qty2 || null,
      qty3: todo.qty3 || null,
    });
    setErrors({});
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      public_type: e.target.value as '公開' | '非公開',
    }));
  };

  const handleSubmit = async () => {
    const result = todoSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        newErrors[issue.path.join('.')] = issue.message;
      });
      console.log(newErrors);
      setErrors(newErrors);
      return;
    }

    try {
      if (isEditMode && editingTodo) {
        await axios.put(`${API_BASE_URL}/${editingTodo.id}`, formData);
      } else {
        await axios.post(API_BASE_URL, formData);
      }
      fetchTodos();
      closeDialog();
    } catch (error) {
      console.error('Failed to submit todo:', error);
      // 必要に応じてエラー処理
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Failed to delete todo:', error);
      // 必要に応じてエラー処理
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async () => {
    if (searchQuery) {
      try {
        const response = await axios.get<Todo[]>(`/api/search?q=${searchQuery}`);
        setTodos(response.data);
      } catch (error) {
        console.error('Failed to search todos:', error);
      }
    } else {
      fetchTodos(); // 空の場合は全件表示に戻す
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TODO App</h1>

      {/* 検索バー */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="検索..."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline"
          onClick={handleSearchSubmit}
        >
          検索
        </button>
      </div>

      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 focus:outline-none focus:shadow-outline"
        onClick={openAddDialog}
      >
        TODO を追加
      </button>

      {/* TODO リスト */}
      <ul className="space-y-2">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="bg-white shadow rounded p-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold">{todo.title}</h3>
              <p className="text-gray-700">{todo.content}</p>
            </div>
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
                onClick={() => openEditDialog(todo)}
              >
                編集
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleDelete(todo.id)}
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* ダイアログ */}
      {isDialogOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {isEditMode ? 'TODO を編集' : 'TODO を追加'}
                </h3>
                <div className="mt-2">
                  {/* フォーム */}
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                      タイトル
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''}`}
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                    {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
                      内容
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.content ? 'border-red-500' : ''}`}
                      value={formData.content}
                      onChange={handleInputChange}
                    />
                    {errors.content && <p className="text-red-500 text-xs italic">{errors.content}</p>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">公開設定</label>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="public"
                        name="public_type"
                        value="公開"
                        className="mr-2"
                        checked={formData.public_type === '公開'}
                        onChange={handleRadioChange}
                      />
                      <label htmlFor="public" className="mr-4">公開</label>
                      <input
                        type="radio"
                        id="private"
                        name="public_type"
                        value="非公開"
                        className="mr-2"
                        checked={formData.public_type === '非公開'}
                        onChange={handleRadioChange}
                      />
                      <label htmlFor="private">非公開</label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">食品</label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="food_orange"
                        name="food_orange"
                        className="mr-2"
                        checked={formData.food_orange || false}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="food_orange" className="mr-4">オレンジ</label>
                      <input
                        type="checkbox"
                        id="food_apple"
                        name="food_apple"
                        className="mr-2"
                        checked={formData.food_apple || false}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="food_apple" className="mr-4">リンゴ</label>
                      <input
                        type="checkbox"
                        id="food_banana"
                        name="food_banana"
                        className="mr-2"
                        checked={formData.food_banana || false}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="food_banana">バナナ</label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">公開日1</label>
                    <input
                      type="date"
                      id="pub_date1"
                      name="pub_date1"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.pub_date1 || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">公開日2</label>
                    <input
                      type="date"
                      id="pub_date2"
                      name="pub_date2"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.pub_date2 || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">公開日3</label>
                    <input
                      type="date"
                      id="pub_date3"
                      name="pub_date3"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.pub_date3 || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="qty1" className="block text-gray-700 text-sm font-bold mb-2">数量1</label>
                    <input
                      type="text"
                      id="qty1"
                      name="qty1"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.qty1 || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="qty2" className="block text-gray-700 text-sm font-bold mb-2">数量2</label>
                    <input
                      type="text"
                      id="qty2"
                      name="qty2"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.qty2 || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="qty3" className="block text-gray-700 text-sm font-bold mb-2">数量3</label>
                    <input
                      type="text"
                      id="qty3"
                      name="qty3"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.qty3 || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSubmit}
                >
                  {isEditMode ? '保存' : '作成'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeDialog}
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;