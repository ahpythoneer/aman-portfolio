from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime, timedelta
import random
import json
import os

app = Flask(__name__)
CORS(app)

# Simulated database (in production, use actual database)
class PortfolioData:
    def __init__(self):
        self.views = random.randint(1000, 2000)
        self.github_stats = {
            "repos": 42,
            "stars": 156,
            "followers": 89,
            "contributions": 1247
        }
        self.blog_posts = [
            {
                "id": 1,
                "title": "Automating PowerMax Storage with Python",
                "excerpt": "How I reduced storage provisioning time by 80% using Python and REST APIs",
                "date": "2024-01-15",
                "tags": ["Python", "Storage", "Automation"],
                "read_time": "5 min",
                "views": 342
            },
            {
                "id": 2,
                "title": "Building a Home Lab Kubernetes Cluster",
                "excerpt": "Step-by-step guide to creating a production-grade K8s cluster at home",
                "date": "2023-12-20",
                "tags": ["Kubernetes", "Home Lab", "DevOps"],
                "read_time": "10 min",
                "views": 567
            },
            {
                "id": 3,
                "title": "Monitoring at Scale with Grafana and Prometheus",
                "excerpt": "Implementing comprehensive monitoring for 100+ server infrastructure",
                "date": "2023-11-10",
                "tags": ["Monitoring", "Grafana", "Prometheus"],
                "read_time": "8 min",
                "views": 423
            }
        ]
        self.achievements = [
            {
                "year": 2024,
                "title": "Innovation Award",
                "description": "Power monitoring solution saving $50K annually"
            },
            {
                "year": 2023,
                "title": "4x Winning Together Awards",
                "description": "Cross-functional collaboration excellence"
            },
            {
                "year": 2022,
                "title": "Fastest Ticket Resolution",
                "description": "Sub-10 minute average response time"
            }
        ]

portfolio_data = PortfolioData()

@app.route('/api/health')
def health():
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "uptime": "99.99%"
    })

@app.route('/api/profile')
def profile():
    return jsonify({
        "name": "Aman Patel",
        "title": "Automation & Infrastructure Engineer",
        "location": "Round Rock, TX",
        "experience_years": 8,
        "current_role": "Lab Support Engineer 2",
        "company": "Dell Technologies",
        "specialties": [
            "Cloud Infrastructure",
            "Automation",
            "Enterprise Storage",
            "Kubernetes"
        ],
        "bio": "Passionate about building resilient infrastructure and automating everything. From managing enterprise storage arrays to deploying Kubernetes clusters, I love solving complex technical challenges.",
        "languages": ["English", "Python", "Bash", "PowerShell", "JavaScript"],
        "interests": ["Home Lab", "Automation", "Cloud Native", "Open Source"]
    })

@app.route('/api/skills')
def skills():
    return jsonify({
        "cloud": {
            "category": "Cloud Platforms",
            "skills": [
                {"name": "AWS", "level": 90, "years": 4},
                {"name": "Google Cloud", "level": 85, "years": 3},
                {"name": "Azure", "level": 88, "years": 5}
            ]
        },
        "automation": {
            "category": "Automation & Scripting",
            "skills": [
                {"name": "Python", "level": 95, "years": 6},
                {"name": "Ansible", "level": 90, "years": 5},
                {"name": "Terraform", "level": 88, "years": 4},
                {"name": "Jenkins", "level": 85, "years": 4}
            ]
        },
        "infrastructure": {
            "category": "Infrastructure",
            "skills": [
                {"name": "Kubernetes", "level": 92, "years": 4},
                {"name": "Docker", "level": 94, "years": 5},
                {"name": "VMware", "level": 90, "years": 6},
                {"name": "Linux", "level": 93, "years": 7}
            ]
        },
        "storage": {
            "category": "Enterprise Storage",
            "skills": [
                {"name": "PowerMax", "level": 95, "years": 3},
                {"name": "PowerStore", "level": 93, "years": 3},
                {"name": "Unity", "level": 90, "years": 4},
                {"name": "PowerScale", "level": 88, "years": 2}
            ]
        }
    })

@app.route('/api/metrics')
def metrics():
    # Simulate real-time metrics
    portfolio_data.views += random.randint(1, 5)
    
    return jsonify({
        "projects_completed": 20,
        "uptime_percentage": 99.9,
        "tickets_resolved": 15000,
        "automation_scripts": 50,
        "certifications": 4,
        "awards": 5,
        "lines_of_code": 125000,
        "containers_deployed": 200,
        "infrastructure_managed": "$2.5M",
        "time_saved_weekly": "40 hours",
        "portfolio_views": portfolio_data.views
    })

@app.route('/api/projects')
def projects():
    return jsonify([
        {
            "id": 1,
            "title": "Security Vulnerability Tracker",
            "description": "JavaScript application automating vulnerability tracking across 500+ assets",
            "long_description": "Built a comprehensive web application that integrates with security scanning tools to automatically track, categorize, and prioritize vulnerabilities. The system reduced manual effort by 80% and provides real-time dashboards for security teams.",
            "impact": "Saved 20 hours weekly",
            "metrics": {
                "time_saved": "80%",
                "assets_tracked": 500,
                "weekly_hours_saved": 20
            },
            "tech": ["JavaScript", "React", "REST API", "Node.js", "MongoDB"],
            "github": "https://github.com/yourusername/vuln-tracker",
            "status": "production",
            "year": 2024
        },
        {
            "id": 2,
            "title": "Power Monitoring Stack",
            "description": "Real-time power monitoring for 100+ server racks with predictive analytics",
            "long_description": "Developed a comprehensive power monitoring solution using open-source tools. The system collects data from PDUs via SNMP, stores it in InfluxDB, and provides real-time visualization through Grafana. Includes alerting for anomalies and predictive analytics for capacity planning.",
            "impact": "25% reduction in planning time",
            "metrics": {
                "racks_monitored": 100,
                "data_points_per_day": "1M+",
                "cost_savings": "$50K/year"
            },
            "tech": ["Grafana", "Prometheus", "Python", "InfluxDB", "SNMP", "Docker"],
            "status": "production",
            "year": 2023
        },
        {
            "id": 3,
            "title": "Infrastructure Monitoring Platform",
            "description": "Centralized React & Flask platform unifying 10+ monitoring tools",
            "long_description": "Created a unified platform that aggregates data from multiple monitoring tools including Zabbix, Prometheus, and custom scripts. Provides a single pane of glass for infrastructure health, automated remediation workflows, and intelligent alerting.",
            "impact": "Unified 10+ tools into one platform",
            "metrics": {
                "tools_integrated": 10,
                "endpoints_monitored": 500,
                "mttr_improvement": "60%"
            },
            "tech": ["React", "Flask", "InfluxDB", "REST API", "WebSockets", "Redis"],
            "github": "https://github.com/yourusername/infra-platform",
            "demo": "https://demo.racktocloud.com",
            "status": "production",
            "year": 2023
        },
        {
            "id": 4,
            "title": "HA VMware Cluster",
            "description": "High-availability vSphere cluster with automated failover and 99.9% uptime",
            "long_description": "Designed and implemented a highly available VMware vSphere cluster with VSAN storage, automated DRS policies, and comprehensive backup strategies. The cluster hosts critical production workloads with zero unplanned downtime.",
            "impact": "Zero downtime for critical apps",
            "metrics": {
                "uptime": "99.9%",
                "vms_hosted": 150,
                "storage_capacity": "500TB"
            },
            "tech": ["VMware vSphere", "VSAN", "VMotion", "PowerCLI", "Veeam"],
            "status": "production",
            "year": 2022
        }
    ])

@app.route('/api/experience')
def experience():
    return jsonify([
        {
            "id": 1,
            "role": "Lab Support Engineer 2 - Automation & Infrastructure",
            "company": "Dell Technologies",
            "location": "Round Rock, TX",
            "start_date": "2022-03",
            "end_date": None,
            "current": True,
            "highlights": [
                "Led enterprise storage management for PowerMax, PowerStore, PowerScale clusters with SRDF/Metro",
                "Automated infrastructure deployments using Ansible, Python, Terraform, and Jenkins",
                "Maintained 99.9% data availability with MySQL multi-site replication",
                "Reduced downtime by 25% implementing Nginx and HAProxy load balancers",
                "Containerized internal applications and deployed Kubernetes clusters",
                "Created disaster recovery plans for critical systems"
            ],
            "technologies": ["PowerMax", "Kubernetes", "Python", "Ansible", "Terraform", "MySQL", "Docker"]
        },
        {
            "id": 2,
            "role": "Computer Technology Specialist",
            "company": "Del Mar College",
            "location": "Corpus Christi, TX",
            "start_date": "2017-07",
            "end_date": "2022-03",
            "current": False,
            "highlights": [
                "Managed 50+ daily tickets with 95% satisfaction rate",
                "Led Office 365 migration for 150+ users",
                "Implemented Hybrid AD for 10,000+ users migration to Azure AD",
                "Deployed first SAN storage with HPE 3PAR and VMware Cluster",
                "Reduced manual workload by 30% through PowerShell and Python automation"
            ],
            "technologies": ["Office 365", "Azure AD", "VMware", "HPE 3PAR", "PowerShell", "Python"]
        }
    ])

@app.route('/api/certifications')
def certifications():
    return jsonify([
        {
            "name": "AWS Certified Solutions Architect - Associate",
            "issuer": "Amazon Web Services",
            "issue_date": "2023-06-01",
            "expiry_date": "2026-06-01",
            "credential_id": "AWS-ASA-123456",
            "verification_url": "https://aws.amazon.com/verification",
            "badge_url": "/badges/aws-sa.png"
        },
        {
            "name": "Google Cloud Professional Cloud Architect",
            "issuer": "Google Cloud",
            "issue_date": "2023-07-01",
            "expiry_date": "2027s-07-01",
            "credential_id": "GCP-PCA-789012",
            "verification_url": "https://cloud.google.com/certification",
            "badge_url": "/badges/gcp-pca.png"
        },
        {
            "name": "Azure Administrator Associate (AZ-104)",
            "issuer": "Microsoft",
            "issue_date": "2021-12-01",
            "expiry_date": "2024-12-01",
            "credential_id": "AZ-104-345678",
            "verification_url": "https://learn.microsoft.com/credentials",
            "badge_url": "/badges/azure-admin.png"
        },
        {
            "name": "Certified Kubernetes Administrator",
            "issuer": "CNCF",
            "issue_date": "2024-05-01",
            "expiry_date": "2026-05-01",
            "credential_id": "CKA-901234",
            "verification_url": "https://cncf.io/certification",
            "badge_url": "/badges/cka.png"
        }
    ])

@app.route('/api/github/stats')
def github_stats():
    # In production, fetch from GitHub API
    return jsonify(portfolio_data.github_stats)

@app.route('/api/blog/posts')
def blog_posts():
    return jsonify(portfolio_data.blog_posts)

@app.route('/api/blog/post/<int:post_id>')
def blog_post(post_id):
    post = next((p for p in portfolio_data.blog_posts if p['id'] == post_id), None)
    if post:
        # Add full content for individual post
        post['content'] = f"Full content for post {post_id}..."
        post['views'] += 1
        return jsonify(post)
    return jsonify({"error": "Post not found"}), 404

@app.route('/api/achievements')
def achievements():
    return jsonify(portfolio_data.achievements)

@app.route('/api/timeline')
def timeline():
    return jsonify([
        {
            "date": "2024-01",
            "type": "award",
            "title": "Innovation Award",
            "description": "Power monitoring solution"
        },
        {
            "date": "2023-07",
            "type": "certification",
            "title": "Google Cloud Professional Architect",
            "description": "Achieved GCP certification"
        },
        {
            "date": "2023-06",
            "type": "certification",
            "title": "AWS Solutions Architect",
            "description": "Achieved AWS certification"
        },
        {
            "date": "2022-03",
            "type": "career",
            "title": "Joined Dell Technologies",
            "description": "Lab Support Engineer 2"
        },
        {
            "date": "2021-12",
            "type": "certification",
            "title": "Azure Administrator",
            "description": "Achieved Azure certification"
        },
        {
            "date": "2017-07",
            "type": "career",
            "title": "Started at Del Mar College",
            "description": "Computer Technology Specialist"
        }
    ])

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    # In production, send email or save to database
    print(f"Contact form submission: {data}")
    return jsonify({
        "success": True,
        "message": "Thank you for reaching out! I'll get back to you soon."
    })

@app.route('/api/analytics/track', methods=['POST'])
def track_analytics():
    data = request.get_json()
    # In production, save to analytics database
    event = data.get('event', 'unknown')
    print(f"Analytics event: {event}")
    return jsonify({"success": True})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
