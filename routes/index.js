var express = require('express');
var request = require('request');
var router = express.Router();
var util = require('util');
var cheerio = require('cheerio');
var codeforces = require('codeforces-api');
var Sync = require('syncho');


var codeforcesProblemsUrl = "http://codeforces.com/api/problemset.problems?tags";
var codeforcesProblemUrl = "http://codeforces.com/contest/%s/problem/%s";
var codeforcesSubmitUrl = "http://codeforces.com/contest/%s/submit/%s";
codeforces.setApis('c154b154ae345a990f5024e89420e88cc7215a58', 'ce0e9272c69f5d5d43e33233d78a4876394c1785');


var problems = [{
    "contestId": 788,
    "index": "C",
    "name": "The Great Mixing",
    "type": "PROGRAMMING",
    "points": 1500,
    "tags": [
        "dfs and similar",
        "dp",
        "math"
    ]
}];

request(codeforcesProblemsUrl, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        var data = JSON.parse(body);
        problems = data.result.problems;
    }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', tags: tags, levels: levels});
});


router.get('/problems/random', function(req, res) {
    var problem = getRandomProblem(1, []);
    var problemUrl = util.format(codeforcesProblemUrl, problem.contestId, problem.index);
    var submitUrl = util.format(codeforcesSubmitUrl, problem.contestId, problem.index);

    request(problemUrl, function (error, response, html) {
        if (!error && response.statusCode === 200) {
            var $ = cheerio.load(html);
            $("#body").html($(".problemindexholder").html());

            res.json({
                html: $.html(),
                problemUrl: problemUrl,
                submitUrl: submitUrl
            })
        } else {
            res.json({
                html: "Internal Server Error",
                problemUrl: problemUrl,
                submitUrl: submitUrl
            })
        }
    });

});

module.exports = router;

function getRandomProblem(level, tags) {
    var indexId = Math.floor(Math.random()*problems.length);
    return problems[indexId];
}


var tags = [
    "implementation","dp","math","greedy","brute force","data structures","constructive algorithms",
    "dfs and similar","sortings","binary search","graphs","trees","strings","number theory",
    "geometry","combinatorics","two pointers","dsu","bitmasks","probabilities","shortest paths",
    "hashing","divide and conquer","games","matrices","flows","string suffix structures",
    "expression parsing","graph matchings","ternary search","meet-in-the-middle","fft",
    "2-sat","chinese remainder theorem","schedules"
];

var levels = [
    {
        "name": "Level 1",
        "value": 1
    },
    {
        "name": "Level 2",
        "value": 2
    },
    {
        "name": "Level 3",
        "value": 3
    },
    {
        "name": "Level 4",
        "value": 4
    },
    {
        "name": "Level 5",
        "value": 5
    },
    {
        "name": "Level 6",
        "value": 6
    },
    {
        "name": "Level 7",
        "value": 7
    }
];



