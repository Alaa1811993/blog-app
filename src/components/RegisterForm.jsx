export default function RegisterForm({
  name,
  email,
  password,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="max-w-sm mx-auto mt-10"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Register
      </button>
    </form>
  );
}
