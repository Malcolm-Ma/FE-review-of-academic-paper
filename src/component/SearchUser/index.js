/**
 * @file search user component
 * @author Mingze Ma
 */
import { Autocomplete, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useCallback, useEffect, useMemo, useState } from "react";
import actions from "src/actions";
import _ from "lodash";
import Checkbox from "@mui/material/Checkbox";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";

const icon = <CheckBoxOutlineBlank fontSize="small"/>;
const checkedIcon = <CheckBox fontSize="small"/>

export default (props) => {

  const {
    label="Select Users",
    value,
    onChange,
    currentOrgId,
  } = props;

  const [resultValue, setResultValue] = useState(value || []);

  const [searchResultList, setSearchResultList] = useState([]);

  const [loading, setLoading] = useState(false);

  const searchUserAsync = useCallback(async (query = '') => {
    setLoading(true);
    try {
      const res = await actions.searchUsers({ query });
      setSearchResultList(_.uniqBy([...resultValue, ...res], 'id'));
    } catch (e) {
      console.error(e.message);
    }
    setLoading(false);
  }, [resultValue]);

  const handleInputChange = useCallback(async (_e, val, reason) => {
    console.log('--val, reason--\n', val, reason);
    // set resultList to empty to show the loading tips
    if (reason === 'reset') {
      await searchUserAsync();
      return;
    }
    await searchUserAsync(val);
  }, [searchUserAsync]);

  const handleChange = useCallback((_e, val) => {
    console.log('--val--\n', val);
    onChange?.(val);
    setResultValue(val);
  }, [onChange]);

  useEffect(() => {
    searchUserAsync();
  }, [searchUserAsync]);

  useEffect(() => {
    console.log('--resultValue--\n', resultValue);
    console.log('--searchResultList--\n', searchResultList);
  }, [resultValue, searchResultList]);

  return (
    <Autocomplete
      loading={loading}
      multiple
      filterOptions={(options) => options}
      options={searchResultList}
      disableCloseOnSelect
      ListboxComponent={List}
      value={value || resultValue}
      onChange={handleChange}
      getOptionLabel={(option) => _.get(option, 'full_name', '')}
      getOptionDisabled={(option) => _.get(option, 'enable_status', 1) === 0}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder="Search User"/>
      )}
      renderOption={(props, option, state) => (
        <ListItem
          {...props}
          secondaryAction={<Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            checked={state.selected}
          />}
        >
          <ListItemAvatar>
            <Avatar
              src={_.get(option, 'avatar', '#')}
              alt={_.get(option, 'full_name', '')}
            />
          </ListItemAvatar>
          <ListItemText primary={_.get(option, 'full_name', '')} secondary={_.get(option, 'email', '')} />
        </ListItem>
      )}
    />

  );
};
