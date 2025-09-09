import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
export default function SkillsForm  ({ skill, index, handleChange, handleRemove }) { (
  <div className="bg-blue-50 p-5 rounded-xl border border-blue-200 mb-5 shadow-sm">
    <div className="flex justify-between items-center mb-4">
      <h4 className="text-lg font-semibold text-blue-900">
        Skill #{index + 1}
      </h4>
      <button
        type="button"
        onClick={() => handleRemove(index)}
        className="text-red-600 hover:text-red-800 text-sm font-medium"
      >
        Remove
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField
        label="Skill Name"
        name="name"
        value={skill.name || ""}
        onChange={(e) => handleChange(index, e, "skills")}
        placeholder="e.g., React"
      />
      <InputField
        label="Proficiency (Optional)"
        name="proficiency"
        value={skill.proficiency || ""}
        onChange={(e) => handleChange(index, e, "skills")}
        placeholder="e.g., Advanced, Intermediate"
      />
      <TextAreaField
        label="Description (Optional)"
        name="description"
        value={skill.description || ""}
        onChange={(e) => handleChange(index, e, "skills")}
        placeholder="Describe your experience with this skill..."
        rows={2}
      />
    </div>
  </div>
)};
