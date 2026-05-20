import SearchBar from './SearchBar.jsx';
import DifficultyFilter from './DifficultyFilter.jsx';
import TagFilter from './TagFilter.jsx';

export default function ProblemsFilters(
  props
) {
  return (
    <div className="bg-battle-card border border-battle-border rounded-2xl p-5 space-y-4">
      <SearchBar
        search={props.search}
        setSearch={props.setSearch}
      />

      <DifficultyFilter
        selectedDiff={
          props.selectedDiff
        }
        setSelectedDiff={
          props.setSelectedDiff
        }
      />

      <TagFilter
        selectedTag={
          props.selectedTag
        }
        setSelectedTag={
          props.setSelectedTag
        }
      />
    </div>
  );
}