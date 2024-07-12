
import { GridColumnMenuContainer, GridColumnMenuFilterItem, GridColumnMenuHideItem } from "@mui/x-data-grid";
export default function CustomColumnMenu(props) {
    const { hideMenu, currentColumn, open } = props;
    return (
        <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} open={open}>
            <GridColumnMenuFilterItem />
            <GridColumnMenuHideItem />
        </GridColumnMenuContainer>
    )
}