export class NavigationModel {
    headers: NavigationMenuItem[];
}

export class NavigationMenuItem {
    title: string;
    isForm: boolean;
    id: string;
    subMenus: NavigationSubmenuItem[]
}

export class NavigationSubmenuItem {
    title: string;
    tabId: string;
}

