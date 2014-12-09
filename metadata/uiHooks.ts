var uiHooks = {
  navbar_main_dashboard: {
    items: {
      type: "item",
      content: {
        icon: "bicycle",
        text: "inventory::navbar.items",
        link: "items"
      },
      permissions: {
        inventory: {
          read: true
        }
      },
      priority: 175
    },
    quickactions: {
      content: {
        children: {
          createItem: {
            type: "item",
            content: {
              icon: "bicycle",
              text: "inventory::navbar.quickActions.createItem",
              link: "createItem"
            },
            priority: 100,
            permissions: {
              inventory: {
                create: true
              }
            }
          },
        },
      }
    }
  },
  sidebar: {
    items: {
      type: "item",
      content: {
        icon: "bicycle",
        text: "inventory::navbar.items",
        children: {
          createInvoice: {
            type: "item",
            content: {
              icon: "plus",
              text: "inventory::sidebar.createItem",
              link: "createItem"
            },
            priority: 100,
            permissions: {
              inventory: {
                create: true
              }
            }
          },
          listItems: {
            type: "item",
            content: {
              icon: "list-ul",
              text: "inventory::sidebar.listItems",
              link: "items"
            },
            permissions: {
              inventory: {
                view: true
              }
            },
            priority: 150
          }
        }
      },
      priority: 300,
      permissions: {
        inventory: {
          view: true
        }
      }
    }
  }
};

export = uiHooks;
