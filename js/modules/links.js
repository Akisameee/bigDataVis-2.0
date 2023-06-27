import { linkColorScale } from '../graph.js';
import { cluster_flag } from './cluster_mode_container.js';

export var get_links = function(edges, svg, g){
    var num = 0;
    var links = g.append("g")
        .selectAll("line")   //选择所有"line"元素
        .data(edges)   //将edges绑定上
        .enter()
        .filter(d=>cluster_flag || d.source.id.indexOf("@") == -1)
        .append("line")
        .attr("stroke",function(d,i)
        {
            num++;
            var gradient = svg.append("defs")
                .append("linearGradient")
                .attr("id", "edge-gradient" + num);
            var step = (d.edge_type.length - 1);
            var cnt = 0;
            if(d.edge_type.length === 1){
                step = 100;
                cnt = 1;
            }
            d.edge_type.forEach(element => {
                var color = linkColorScale(element); 
                gradient.append("stop")
                    .attr("offset", step * cnt + "%")
                    .attr("stop-color", color + "");
                cnt++;
            });
            
            return "url(#edge-gradient" + num + ")";  //这里决定了边的颜色
        })
        .attr("stroke-opacity", 0.2)
        .attr("stroke-width",function(d,i){
            return d.weight * 2;
        });   //边的粗细

    
    return links;
}

export var get_links_text = function(g, edges){
    //为边添加文字
    var linksText = g.append("g")
        .selectAll("text")
        .data(edges)   
        .enter()
        .append("text")
        .text(function(d)
        {
            return "";  //这里返回的内容决定了每条边上显示的文字
        });
    return linksText;
}