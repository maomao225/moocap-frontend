<nav class="main-menu">
    <ul class="nav">
        <%_.each(data, function(item){%>
        <li>
            <a href="javascript:;" data-code="<%=item.codename%>" data-parent=".nav" aria-expanded="false">
                <i class="glyphicon glyphicon-pencil"></i>
                <span><%=item.name%></span>
                <i class="glyphicon glyphicon-menu-right pull-right"></i>
            </a>
            <%if(item.menu){%>
            <ul class="sub-menu" style="display:none;">
                <%_.each(item.menu, function(subItem){%>
                <li data-code="<%=subItem.codename%>">
                    <a href="javascript:;">
                        <i class="glyphicon glyphicon-th-large"></i>
                        <span><%=subItem.name%></span>
                    </a>
                </li>
                <%})%>
            </ul>
            <%}%>
        </li>
        <%})%>
    </ul>
</nav>
